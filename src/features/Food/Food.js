import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiPlusCircle } from 'react-icons/bi';
import { VictoryPie } from 'victory';
import {
  foodSelector, getFoodData, clearState,
} from './FoodSlice';
import style from '../../assets/Food.module.css';

const Food = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { mealID } = useParams();
  const { foods, isSuccess, isError } = useSelector(foodSelector);
  useEffect(() => {
    dispatch(getFoodData({ token: localStorage.getItem('token'), mealID }));
  },
  []);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      history.push('/');
    }
    if (isSuccess) {
      dispatch(clearState());
    }
  }, [isError, isSuccess]);

  const foodItems = foods.map((food) => (
    <div className={style.foodItem} key={food.id}>
      <h3>{food.name}</h3>
      <p>{food.calories}</p>
    </div>
  ));

  if (foodItems.length < 1) {
    return (
      <div className={style.container}>
        <h2>No Foods Found</h2>
        <p>Click the button at below to add some</p>
        <Link to={`/meals/${mealID}/addFoods`} className={style.addButton}>
          <BiPlusCircle />
          Add Food
        </Link>

      </div>
    );
  }

  return (
    <div className={style.container}>
      <VictoryPie
        data={foods}
        colorScale={['#8ed3f1', '#8090a0', '#c1efbe', '#b3e1f6', '#d5f4d4']}
        x="name"
        y="calories"
        padding={{ left: 100, right: 100 }}
      />
      <div className={style.foodList}>
        {foodItems}
      </div>
      <Link to={`/meals/${mealID}/addFoods`} className={style.addButton}>
        <BiPlusCircle />
        Add Food
      </Link>
    </div>
  );
};

export default Food;
