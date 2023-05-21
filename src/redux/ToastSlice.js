import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  message: 'ssss',
  type: '',
};
export const ToastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    SET_VISIBLE: (state, action) => {
      state.visible = action.payload;
    },
    SET_MESSAGE: (state, action) => {
      state.message = action.payload;
    },
    SET_TYPE: (state, action) => {
      state.type = action.payload;
    },
  },
});
