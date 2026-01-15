import pickle, os
src='random_forest_model.pkl'
if not os.path.exists(src):
    print('src missing')
else:
    obj = pickle.load(open(src,'rb'))
    if isinstance(obj, dict) and 'model' in obj:
        model = obj['model']
        print('extracted model object', type(model))
    else:
        model = obj
        print('object already model', type(model))
    out='..\\random_forest_model.pkl'
    with open(out,'wb') as f:
        pickle.dump(model,f)
    print('wrote raw model to', out, os.path.getsize(out))
