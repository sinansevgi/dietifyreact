/* eslint-disable no-param-reassign */
/* reduxjs/toolkit automatically renders mutable assignments to immutable ones.
* Therefore eslint warning related to this issue is suppressed */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getMealData = createAsyncThunk(
  'meals/getMealData',
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch(
        'https://dietifybackend.herokuapp.com/meals',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      const data = await response.json();
      if (response.status === 200) {
        return { ...data };
      }
      return thunkAPI.rejectWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const addMeal = createAsyncThunk(
  'meals/addMeal',
  async ({ token, title }, thunkAPI) => {
    try {
      const response = await fetch(
        'https://dietifybackend.herokuapp.com/meals',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,

          },
          body: JSON.stringify({
            title,
          }),
        },
      );
      const data = await response.json();
      if (response.status === 201) {
        return { ...data };
      }
      return thunkAPI.rejectWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const mealSlice = createSlice({
  name: 'meals',
  initialState: {
    mealsList: {},
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
    [getMealData.pending]: (state) => {
      state.isFetching = true;
    },
    [getMealData.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.mealsList = { ...payload };
    },
    [addMeal.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
    [addMeal.pending]: (state) => {
      state.isFetching = true;
    },
    [addMeal.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  },
});

export const { clearState } = mealSlice.actions;
export const mealSelector = (state) => state.meals;
