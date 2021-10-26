import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BiPlusCircle } from 'react-icons/bi';
import style from '../../assets/Meal.module.css';

const Meal = ({ meals, fetchStatus }) => {
  const mealItems = Object.keys(meals);
  const lastRecord = mealItems[mealItems.length - 1];
  const mealArray = meals[lastRecord] || [];
  const mealLinks = mealArray.map((meal) => (
    <Link key={meal.id} to={`/meals/${meal.id}/foods`} className={style.meal}>{meal.title}</Link>
  ));
  if (mealLinks.length < 1) {
    return (
      <div>
        <h2>No Meals Found</h2>
        <p>Click the button at below to add some</p>
        <div className={style.addButton}>
          <Link to="meals/addMeal" className={style.meal}>
            <BiPlusCircle />
            Add Meal
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className={style.mealContainer}>
      <h2>
        Last Record Date:
        {lastRecord}
      </h2>
      <h3>Recorded Meals:</h3>
      {fetchStatus && mealLinks}
      <div className={style.addButton}>
        <Link to="meals/addMeal" className={style.meal}>
          <BiPlusCircle />
          Add Meal
        </Link>
      </div>
    </div>
  );
};

Meal.propTypes = {
  meals: PropTypes.instanceOf(Object).isRequired,
  fetchStatus: PropTypes.bool.isRequired,
};

export default Meal;
