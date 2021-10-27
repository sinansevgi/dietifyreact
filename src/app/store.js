import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../features/User/UserSlice';
import { mealSlice } from '../features/Meal/MealSlice';
import { foodSlice } from '../features/Food/FoodSlice';

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    meals: mealSlice.reducer,
    foods: foodSlice.reducer,
  },
});
