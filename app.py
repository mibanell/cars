from flask import Flask, request
from flask_restful import Resource, Api

import pandas as pd

import tensorflow as tf
from tensorflow.data import Dataset

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
        print(data)
        # observation to dataset
        data = df_to_dataset(dataframe=data, target_name='price', batch_size=1)
        # make prediction
        prediction = model.predict(data)

        return {'price': str(prediction[0][0])}

class brands(Resource):
    def get(self):
        data = pd.read_csv('data/train.csv', encoding='cp1252', index_col=None)

        return dict(enumerate(data.brand.unique()))

class models(Resource):
    def get(self):
        brand = request.args['brand']
        data = pd.read_csv('data/train.csv', encoding='cp1252', index_col=None)
        brand_models = data.loc[data.brand == brand, 'model'].dropna().unique()
        brand_models.sort()

        return dict(enumerate(brand_models))

class abtest(Resource):
    def get(self):
        return dict(enumerate(['control', 'test']))

class vehicleType(Resource):
    def get(self):
        vtypes = ['limousine', 'cabrio', 'kleinwagen', 'bus', 'kombi', 'suv', 'coupe']
        vtypes.sort()
        vtypes.append('andere')
        return dict(enumerate(vtypes))

class gearbox(Resource):
    def get(self):
        return dict(enumerate(['automatik', 'manuell', 'andere']))

class fuelType(Resource):
    def get(self):
        ftypes = ['diesel', 'benzin', 'lpg', 'cng', 'hybrid', 'elektro']
        ftypes.sort()
        ftypes.append('andere')
        return dict(enumerate(ftypes))

class notRepairedDamage(Resource):
    def get(self):
        return dict(enumerate(['ja', 'nein', 'andere']))



api.add_resource(makePrediction, '/predict')
api.add_resource(brands, '/brands')
api.add_resource(models, '/models')
api.add_resource(abtest, '/abtest')
api.add_resource(vehicleType, '/vehicleType')
api.add_resource(gearbox, '/gearbox')
api.add_resource(fuelType, '/fuelType')
api.add_resource(notRepairedDamage, '/notRepairedDamage')


if __name__ == '__main__':
    app.run(debug=True)