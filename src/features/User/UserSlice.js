/* eslint-disable no-param-reassign */
/* reduxjs/toolkit automatically renders mutable assignments to immutable ones.
* Therefore eslint warning related to this issue is suppressed */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async ({
    name, email, password, passwordConfirmation,
  }, thunkAPI) => {
    try {
      const response = await fetch(
        'https://dietifybackend.herokuapp.com/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            passwordConfirmation,
          }),
        },
      );
      const data = await response.json();
      if (response.status === 201) {
        localStorage.setItem('token', data.auth_token);
        return { ...data, username: name, email };
      }
      return thunkAPI.rejectWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(
        'https://dietifybackend.herokuapp.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem('token', data.auth_token);
        return data;
      }
      return thunkAPI.rejectWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },

  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },

  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.email;
      state.username = payload.name;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.username = payload.name;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState } = userSlice.actions;
export const userSelector = (state) => state.user;
