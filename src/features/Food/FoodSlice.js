/* eslint-disable no-param-reassign */
/* reduxjs/toolkit automatically renders mutable assignments to immutable ones.
* Therefore eslint warning related to this issue is suppressed */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getFoodData = createAsyncThunk(
  'foods/getFoodData',
  async ({ token, mealID }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://dietifybackend.herokuapp.com/meals/${mealID}/foods`,
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
        return [...data];
      }
      return thunkAPI.rejectWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const addFood = createAsyncThunk(
  'foods/addFood',
  async ({
    token, name, calories, mealID,
  }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://dietifybackend.herokuapp.com/meals/${mealID}/foods`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,

          },
          body: JSON.stringify({
            name,
            calories,
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

export const foodSlice = createSlice({
  name: 'foods',
  initialState: {
    foods: [],
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
    [getFoodData.pending]: (state) => {
      state.isFetching = true;
    },
    [getFoodData.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.foods = [...payload];
    },
    [addFood.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
    [addFood.pending]: (state) => {
      state.isFetching = true;
    },
    [addFood.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  },
});

export const { clearState, fetchDone } = foodSlice.actions;
export const foodSelector = (state) => state.foods;
