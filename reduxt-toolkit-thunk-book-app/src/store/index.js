import {configureStore} from '@reduxjs/toolkit';

import bookReducer from './bookSlice';

import auth from './authSlice';

import report from './reportSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    auth,
    report,
  },
});

export default store;
