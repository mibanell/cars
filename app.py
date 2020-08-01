from flask import Flask, request
from flask_restful import Resource, Api
import tensorflow as tf
from tensorflow.data import Dataset
import pandas as pd
from preprocess_tf import preprocessing_fn

app = Flask(__name__)
api = Api(app)

# load model
model = tf.keras.models.load_model("cars_model")

def df_to_dataset(dataframe, target_name, shuffle=True, batch_size=100):
    dataframe = dataframe.copy()
    targets = dataframe.pop(target_name)
    ds = Dataset.from_tensor_slices((dict(dataframe), targets))
    if shuffle:
        ds = ds.shuffle(buffer_size=len(dataframe))
    ds = ds.batch(batch_size)
    return ds


class makePrediction(Resource):
    def get(self):
        # request arguments to dict
        data = request.args.to_dict()
        # default price
        data['price'] = 0
        data = {key: [value] for key, value in data.items()}

        data = preprocessing_fn(
            data=data,
            norm_params='data/numerical_features_normalization.csv',
            model_clusters='data/model_clusters.csv'
        )

        # observation to dataset
        data = df_to_dataset(dataframe=data, target_name='price', batch_size=1)
        # make prediction
        prediction = model.predict(data)

        print(prediction[0][0])

        return {'price': str(prediction[0][0])}


api.add_resource(makePrediction, '/predict')

if __name__ == '__main__':
    app.run(debug=True)