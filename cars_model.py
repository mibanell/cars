from tensorflow.keras import layers
from tensorflow import keras, feature_column, dtypes


def getModel(data, dp_rate, hu):

    # define feature input layer
    def set_numerical_feature(name):
        numerical_feature = feature_column.numeric_column(name, dtype=dtypes.float32)

        return numerical_feature

    def set_one_hot_feature(name, data):
        one_hot_feature = feature_column.categorical_column_with_vocabulary_list(name, data[name].unique().tolist())
        one_hot_feature = feature_column.indicator_column(one_hot_feature)

        return one_hot_feature

    def featureColumns(data):
        feature_columns = []

        # numeric cols
        for header in ['yearOfRegistration', 'powerPS', 'kilometer']:
            feature_columns.append(set_numerical_feature(header))

        #feature_columns.append(set_one_hot_feature('abtest', data))

        #feature_columns.append(set_one_hot_feature('vehicleType', data))

        feature_columns.append(set_one_hot_feature('gearbox', data))

        feature_columns.append(set_one_hot_feature('fuelType', data))

        #feature_columns.append(set_one_hot_feature('brand', data))

        feature_columns.append(set_one_hot_feature('cluster_model', data))

        feature_columns.append(set_one_hot_feature('notRepairedDamage', data))

        feature_layer = layers.DenseFeatures(feature_columns)

        return feature_layer

    # define sequential model
    model = keras.Sequential([
        featureColumns(data=data),
        layers.Dense(hu),
        layers.Activation('relu'),
        layers.Dense(hu),
        layers.Activation('relu'),
        layers.Dense(hu),
        layers.Activation('relu'),
        layers.Dense(hu),
        layers.Activation('relu'),
        layers.Dense(hu),
        layers.Activation('relu'),
        layers.Dense(hu),
        layers.Activation('relu'),
        layers.Dense(1, activation='relu')
    ])

    return model

