import pickle
p='random_forest_model.pkl'
try:
    obj=pickle.load(open(p,'rb'))
    print('type',type(obj))
    if isinstance(obj,dict):
        print('keys',list(obj.keys())[:10])
    else:
        print('has predict', hasattr(obj,'predict'))
except Exception as e:
    print('error', e)
