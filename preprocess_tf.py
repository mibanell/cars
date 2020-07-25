
def preprocessing_fn(path, norm_params, na_encoding, brand_clusters, model_clusters, postalcode_clusters):

    import pandas as pd
    import numpy as np

    # Load files as pandas df
    data = pd.read_csv(path, index_col=None)
    norm_params = pd.read_csv(norm_params, encoding='cp1252', index_col=None)

    # Numerical features normalization
    for num_col in ['yearOfRegistration', 'powerPS', 'kilometer']:
        if num_col == 'yearOfRegistration':
            data[num_col] = 2017 - data[num_col]  # feature as car age, we assume we are in 2017.
        data[num_col] = ((data[num_col] - norm_params.loc[norm_params.feature == num_col, 'mean'].values) / \
                        norm_params.loc[norm_params.feature == num_col, 'std'].values).astype('float32')

    return data