import pickle, os
p='random_forest_model.pkl'
if not os.path.exists(p):
    print('no file')
else:
    obj=pickle.load(open(p,'rb'))
    if isinstance(obj, dict) and 'model' in obj:
        m=obj['model']
        print('found dict -> extracting model object', type(m))
    else:
        m=obj
        print('model is already model object', type(m))
    # overwrite with model object
    with open(p,'wb') as f:
        pickle.dump(m,f)
    print('wrote raw model to', p, os.path.getsize(p))
