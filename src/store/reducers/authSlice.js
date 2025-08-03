import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const AUTH = 'auth';

const initialState = {
  userToken: null,
  isSignOut: false,
  signType: null,
  userDetails: null,
  loginStep: "",
};

export const authSlice = createSlice({
  name: AUTH,
  initialState,
  reducers: {
    signIn: (
      state,
      action,
    ) => {
      state.userToken = action.payload.token;
      state.signType = action.payload.signType;
      state.userDetails = action.payload.userDetails;
    },
    signOut: state => {
      state.userToken = null;
      state.isSignOut = true;
      state.signType = null;
      state.userDetails = null;
    },
    newToken: (state, action) => {
      state.userToken = action.payload.token;
    },
    restoreToken: (
      state,
      action
    ) => {
      state.userToken = action.payload.token;
      state.signType = action.payload.signType;
    },
    updateUserDetails: (
      state,
      action,
    ) => {
      state.userDetails = action.payload.userDetails;
    },
    updateLoginStep: (
      state,
      action,
    ) => {
      state.loginStep = action.payload.loginStep;
    },
  },
});

// Export actions
export const {signIn, signOut, restoreToken, newToken, updateUserDetails, updateLoginStep} = authSlice.actions;

// Export reducer
export default authSlice.reducer;