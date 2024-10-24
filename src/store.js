import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index.js';
import { createLogger} from 'redux-logger';

const logger = createLogger();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
