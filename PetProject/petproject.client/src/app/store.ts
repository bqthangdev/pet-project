import { configureStore } from "@reduxjs/toolkit";
// import logger from 'redux-logger';
import * as rootReducer from 'features/index';

const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
