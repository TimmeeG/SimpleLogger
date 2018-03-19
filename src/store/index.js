import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from '../reducers';

const config = {
  key: 'primary',
  storage,
  blacklist: ['spam'],
};

const reducer = persistReducer(config, reducers);

function configureStore() {
  const store = createStore(reducer, applyMiddleware(thunk));
  const persistor = persistStore(store);

  return { persistor, store };
}

const { store } = configureStore();

export default store;
