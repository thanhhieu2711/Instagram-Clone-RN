import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  listPosts: [],
  reloadPost: null,
};
export const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    SET_CURRENT_USER: (state, action) => {
      state.currentUser = action.payload;
    },
    SET_LIST_USER: (state, action) => {
      state.listUser = action.payload;
    },
    SET_RELOAD_POST: (state, action) => {
      state.reloadPost = action.payload;
    },
  },
});
