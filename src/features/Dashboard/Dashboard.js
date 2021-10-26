import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import {
  Link, Route, Switch, useHistory,
} from 'react-router-dom';
import { clearState, getMealData, mealSelector } from '../Meal/MealSlice';
import { groupMeals, totalCalories } from '../../helpers/MealCalory';
import Stats from './Stats';
import Meal from '../Meal/Meal';
import Food from '../Food/Food';
import Navbar from './Navbar';
import style from '../../assets/Dashboard.module.css';
import AddMeal from '../Meal/AddMeal';
import AddFood from '../Food/AddFood';
import Tracker from './Tracker';

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    isSuccess, isFetching, isError, mealsList,
  } = useSelector(mealSelector);
  const [mealList, setMealList] = useState({});
  const [graphData, setGraphData] = useState(
    [
      { food_id: 0, calories: 0 },
      { food_id: 1, calories: 1 }],
  );

  useEffect(() => {
    dispatch(getMealData({ token: localStorage.getItem('token') }));
  }, []);

  useEffect(() => {
    setMealList(groupMeals(mealsList));
    setGraphData(totalCalories(mealsList));
  }, [mealsList]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
    }
    if (isError) {
      dispatch(clearState());
      history.push('/login');
    }
  }, [isError, isSuccess]);

  return (
    <div>
      {isFetching ? (
        <div className="spinner">
          <Loader type="TailSpin" color="#42b5e8" height={100} width={100} />
        </div>
      ) : (
        <>
          <div className={style.dashboard}>
            <div className={style.topbar}>
              <Link to="/"><h1>Dietify</h1></Link>
            </div>
            <div>
              <Switch>
                <Route path="/meals/:mealID/addFoods" component={AddFood} />
                <Route path="/meals/:mealID/foods" component={Food} />
                <Route path="/meals/addMeal" component={AddMeal} />
                <Route path="/tracker">
                  <Tracker meals={mealList} />
                </Route>
                <Route path="/meals">
                  <Meal meals={mealList} />
                </Route>
                <Route path="/">
                  <Stats graphData={graphData} />
                </Route>
              </Switch>
            </div>
          </div>
          <Navbar />
        </>
      )}
    </div>
  );
};

export default Dashboard;
