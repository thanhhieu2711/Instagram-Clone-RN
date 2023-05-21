import {createSelector} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

//  USER SELECTOR
export const currentUserSelector = state => state.user.currentUser;
export const listUserSelector = state => state.user.listUser;
export const updateListUserSelector = state => state.user.updateListUser;
export const searchSelector = state => state.user.searchUser;
export const searchUserResultSelector = createSelector(
  listUserSelector,
  searchSelector,
  currentUserSelector,
  (listUser, searchData, currentUser) => {
    return listUser?.filter(
      user =>
        user.username.includes(searchData) &&
        searchData !== '' &&
        user.uid !== currentUser.uid,
    );
  },
);

// POST SELECTOR
export const reloadPostSelector = state => state.post.reloadPost;

// TOAST SELECTOR
export const visibleToastSelector = state => state.toast.visible;
export const messageToastSelector = state => state.toast.message;
export const typeToastSelector = state => state.toast.type;
