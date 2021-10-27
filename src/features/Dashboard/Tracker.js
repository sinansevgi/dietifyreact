import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import style from '../../assets/Tracker.module.css';

const Tracker = ({ meals }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const mealItems = Object.keys(meals);
  const lastRecord = mealItems[mealItems.length - currentIndex];
  const mealArray = meals[lastRecord] || [];

  const mealList = mealArray.map((meal) => (
    <div key={meal.id}>
      <h3>{meal.title}</h3>
      <div className={style.foods}>
        {meal.foods.map((food) => (
          <div key={food.id} className={style.food}>
            <h4>{food.name}</h4>
            <p>{food.calories}</p>
          </div>
        ))}
      </div>
    </div>
  ));

  function handleLeft() {
    setCurrentIndex((prev) => prev + 1);
  }

  function handleRight() {
    setCurrentIndex((prev) => prev - 1);
  }
  if (mealList.length < 1) {
    return (
      <div>
        <h2>No Meals Found</h2>
        <p>Please add some meals and foods to see your progress</p>
      </div>
    );
  }
  return (
    <div className={style.trackerContainer}>
      {currentIndex === (mealItems.length) ? (<br />
      ) : (
        <div className={style.slideButtons} onClick={handleLeft} aria-hidden="true"><MdArrowBackIosNew /></div>)}
      <div>

        <h2>{lastRecord}</h2>
        {mealList}
      </div>
      {currentIndex === 1 ? (<br />) : (
        <div className={style.slideButtons} onClick={handleRight} aria-hidden="true"><MdArrowForwardIos /></div>)}
    </div>
  );
};

Tracker.propTypes = {
  meals: PropTypes.instanceOf(Object),
};

Tracker.defaultProps = {
  meals: {},
};

export default Tracker;
