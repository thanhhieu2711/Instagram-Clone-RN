import {configureStore} from '@reduxjs/toolkit';
import {UserSlice} from './UserSlice';
import {PostSlice} from './PostSlice';
import {ToastSlice} from './ToastSlice';

export const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    post: PostSlice.reducer,
    toast: ToastSlice.reducer,
  },
  middleware: [],
});
