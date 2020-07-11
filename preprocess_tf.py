
def preprocessing_fn(path, norm_params, na_encoding):

    import pandas as pd

    # Load files as pandas df
    data = pd.read_csv(path, index_col=None)
    norm_params = pd.read_csv(norm_params, encoding='cp1252', index_col=None)
    na_encoding = pd.read_csv(na_encoding, encoding='cp1252', index_col=None)

    # Fill NAs model, vehicle and fuel with 'NA'
    data.model = data.model.fillna('NA')
    data.vehicleType = data.vehicleType.fillna('NA')
    data.fuelType = data.fuelType.fillna('NA')

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


    # Numerical features normalization
    for num_col in ['yearOfRegistration', 'powerPS', 'kilometer']:
        if num_col == 'yearOfRegistration':
            data[num_col] = 2017 - data[num_col]  # feature as car age, we assume we are in 2017.
        data[num_col] = ((data[num_col] - norm_params.loc[norm_params.feature == num_col, 'mean'].values) / \
                        norm_params.loc[norm_params.feature == num_col, 'std'].values).astype('float32')

    return data