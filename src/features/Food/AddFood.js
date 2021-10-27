import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { addFood, clearState, foodSelector } from './FoodSlice';
import style from '../../assets/Food.module.css';

const AddFood = () => {
  const {
    isSuccess, isError, errorMessage,
  } = useSelector(foodSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const { mealID } = useParams();
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      history.push(`/meals/${mealID}/foods`);
    }
  }, [isError, isSuccess]);

  const handleSubmit = () => {
    dispatch(addFood({
      token: localStorage.getItem('token'), name: foodName, calories, mealID,
    }));
  };

  return (
    <div className={style.foodForm}>
      <Toaster />
      <h2>Add new food to meal</h2>
      <input type="text" placeholder="Food Name" value={foodName} minLength={4} onChange={((event) => setFoodName(event.target.value))} />
      <input type="number" placeholder="Calories" value={calories} min={1} max={9999} onChange={((event) => setCalories(event.target.value))} />
      <button type="submit" onClick={handleSubmit}>Add Food</button>
    </div>
  );
};

export default AddFood;
