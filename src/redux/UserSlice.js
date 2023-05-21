import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  updateCurrentUser: null,
  listUser: [],
  updateListUser: null,
  searchUser: 'hiu',
};
export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_CURRENT_USER: (state, action) => {
      state.currentUser = action.payload;
    },
    SET_LIST_USER: (state, action) => {
      // state.listUser = [...state.listUser, action.payload];
      state.listUser = action.payload;
    },
    UPDATE_LIST_USER: (state, action) => {
      state.updateListUser = true;
    },
    SET_SEARCH_USER: (state, action) => {
      state.searchUser = action.payload;
    },
  },
});
