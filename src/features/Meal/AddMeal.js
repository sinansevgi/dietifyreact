import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { addMeal, mealSelector, clearState } from './MealSlice';
import style from '../../assets/Meal.module.css';

const AddMeal = () => {
  const { isSuccess, isError, errorMessage } = useSelector(mealSelector);
  const dispatch = useDispatch();
  const [mealName, setMealName] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      history.push('/meals');
    }
  }, [isError, isSuccess]);

  const handleSubmit = () => {
    dispatch(addMeal({ token: localStorage.getItem('token'), title: mealName }));
  };
  return (
    <div className={style.mealForm}>
      <Toaster />
      <h2>Pleas enter the meal name</h2>
      <input type="text" value={mealName} minLength={4} onChange={((event) => setMealName(event.target.value))} />
      <button type="submit" onClick={handleSubmit}>Add Meal</button>
    </div>
  );
};

AddMeal.propTypes = {

};

export default AddMeal;
