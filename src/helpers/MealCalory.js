import _ from 'lodash';

const groupMeals = (mealsList) => {
  const allMeals = _.flattenDeep(Object.values(mealsList));
  const groupedMeals = _.groupBy(allMeals, (o) => o.created_at.split('').splice(0, 10).join(''));
  return groupedMeals;
};

const totalCalories = (mealsList) => {
  const foodList = _.flattenDeep(_.map(Object.values(mealsList), 'foods'));
  const truncated = foodList.map((food) => ({ ...food, created_at: food.created_at.split('').splice(0, 10).join('') }));
  return truncated;
};
export { groupMeals, totalCalories };
