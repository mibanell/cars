
def preprocessing_fn(path, norm_params, na_encoding, brand_clusters, model_clusters, postalcode_clusters):

    import pandas as pd
    import numpy as np

    # Load files as pandas df
    data = pd.read_csv(path, index_col=None)
    norm_params = pd.read_csv(norm_params, encoding='cp1252', index_col=None)
    na_encoding = pd.read_csv(na_encoding, encoding='cp1252', index_col=None)
    brand_clusters = pd.read_csv(brand_clusters, encoding='cp1252', index_col=None)
    model_clusters = pd.read_csv(model_clusters, encoding='cp1252', index_col=None)
    postalcode_clusters = pd.read_csv(postalcode_clusters, encoding='cp1252', index_col=None)

    # select variables
    data = data.loc[:,['price','abtest','vehicleType','yearOfRegistration','gearbox','powerPS','model','kilometer','fuelType','brand','notRepairedDamage','postalCode']]
    
    # Fill NAs model, vehicle and fuel with 'NA'
    data.model = data.model.fillna('_NA')
    data.brand = data.brand.fillna('_NA')
    data.vehicleType = data.vehicleType.fillna('_NA')
    data.fuelType = data.fuelType.fillna('_NA')

    ## fill notRepairedDamage NAs with 'nein'
    data.notRepairedDamage = data.notRepairedDamage.fillna('nein')

    ## fill gearbox and powerPS NAs with na_encoding
    data = pd.merge(data, na_encoding, on=['model', 'brand'], suffixes=('', '_na'), how='left')
    data.loc[data.gearbox.isna(), 'gearbox'] = data.loc[data.gearbox.isna(), 'gearbox_na']
    data.loc[data.powerPS.isna(), 'powerPS'] = data.loc[data.powerPS.isna(), 'powerPS_na']
    ### case when for a model-brand there is no info of any gearbox
    data.loc[data.gearbox.isna(),'gearbox'] = data.gearbox.mode().values
    ### case when for a model-brand there is no info of any powerPS
    data.loc[data.powerPS.isna(),'powerPS'] = data.powerPS.mean()
    data = data.drop(['gearbox_na', 'powerPS_na'], axis=1)

    ## Drop rows where all rows for a model-brand combination are NA
    data = data.loc[(data.gearbox.isna() == False) & (data.powerPS.isna() == False),]
    
    # Add clustering columns
    data = pd.merge(data, brand_clusters, on=['brand'], how='left')
    data = data.drop(columns='brand')
    ## Add another cluster for the NAs
    data.loc[data.cluster_brand.isna(), 'cluster_brand'] = brand_clusters.cluster_brand.max() + 1
    data.cluster_brand = data.cluster_brand.astype('int')
    
    data = pd.merge(data, model_clusters, on=['model'], how='left')
    data = data.drop(columns='model')
    ## Add another cluster for the NAs
    data.loc[data.cluster_model.isna(), 'cluster_model'] = model_clusters.cluster_model.max() + 1
    data.cluster_model = data.cluster_model.astype('int')
    
    data = pd.merge(data, postalcode_clusters, on=['postalCode'], how='left')
    data = data.drop(columns='postalCode')
    ## Add another cluster for the NAs
    data.loc[data.cluster_pcode.isna(), 'cluster_pcode'] = postalcode_clusters.cluster_pcode.max() + 1
    data.cluster_pcode = data.cluster_pcode.astype('int')
    

    # Numerical features normalization
    for num_col in ['yearOfRegistration', 'powerPS', 'kilometer']:
        if num_col == 'yearOfRegistration':
            data[num_col] = 2017 - data[num_col]  # feature as car age, we assume we are in 2017.
        data[num_col] = ((data[num_col] - norm_params.loc[norm_params.feature == num_col, 'mean'].values) / \
                        norm_params.loc[norm_params.feature == num_col, 'std'].values).astype('float32')

    return data