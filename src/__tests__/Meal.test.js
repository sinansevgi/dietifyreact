import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../app/store';
import Meal from '../features/Meal/Meal';

describe('Meal', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Meal meals={
              {
                '2021-10-24': [
                  {
                    id: 1,
                    title: 'Breakfast',
                    user_id: 1,
                    created_at: '2021-10-24T10:19:13.888Z',
                    updated_at: '2021-10-26T10:19:13.897Z',
                    foods: [
                      {
                        id: 1,
                        name: 'Grapes',
                        calories: 35,
                        meal_id: 1,
                        created_at: '2021-10-26T10:19:13.922Z',
                        updated_at: '2021-10-26T10:19:13.922Z',
                      },
                      {
                        id: 2,
                        name: 'Avocado',
                        calories: 22,
                        meal_id: 1,
                        created_at: '2021-10-26T10:19:13.933Z',
                        updated_at: '2021-10-26T10:19:13.933Z',
                      },
                      {
                        id: 3,
                        name: 'Jam',
                        calories: 133,
                        meal_id: 1,
                        created_at: '2021-10-26T10:19:13.938Z',
                        updated_at: '2021-10-26T10:19:13.938Z',
                      },
                      {
                        id: 4,
                        name: 'Donuts',
                        calories: 310,
                        meal_id: 1,
                        created_at: '2021-10-26T10:19:13.944Z',
                        updated_at: '2021-10-26T10:19:13.944Z',
                      },
                      {
                        id: 5,
                        name: 'Tea',
                        calories: 10,
                        meal_id: 1,
                        created_at: '2021-10-26T10:19:13.948Z',
                        updated_at: '2021-10-26T10:19:13.948Z',
                      },
                    ],
                  },
                  {
                    id: 2,
                    title: 'Lunch',
                    user_id: 1,
                    created_at: '2021-10-24T10:19:13.892Z',
                    updated_at: '2021-10-26T10:19:13.902Z',
                    foods: [
                      {
                        id: 6,
                        name: 'Mushrooms',
                        calories: 70,
                        meal_id: 2,
                        created_at: '2021-10-26T10:19:13.953Z',
                        updated_at: '2021-10-26T10:19:13.953Z',
                      },
                      {
                        id: 7,
                        name: 'Tomato Soup',
                        calories: 100,
                        meal_id: 2,
                        created_at: '2021-10-26T10:19:13.958Z',
                        updated_at: '2021-10-26T10:19:13.958Z',
                      },
                      {
                        id: 8,
                        name: 'Rice',
                        calories: 213,
                        meal_id: 2,
                        created_at: '2021-10-26T10:19:13.962Z',
                        updated_at: '2021-10-26T10:19:13.962Z',
                      },
                      {
                        id: 9,
                        name: 'Eggplant',
                        calories: 210,
                        meal_id: 2,
                        created_at: '2021-10-26T10:19:13.970Z',
                        updated_at: '2021-10-26T10:19:13.970Z',
                      },
                      {
                        id: 10,
                        name: 'Watermelon',
                        calories: 90,
                        meal_id: 2,
                        created_at: '2021-10-26T10:19:13.975Z',
                        updated_at: '2021-10-26T10:19:13.975Z',
                      },
                    ],
                  },
                  {
                    id: 3,
                    title: 'Dinner',
                    user_id: 1,
                    created_at: '2021-10-24T10:19:13.897Z',
                    updated_at: '2021-10-26T10:19:13.906Z',
                    foods: [
                      {
                        id: 11,
                        name: 'Crackers',
                        calories: 120,
                        meal_id: 3,
                        created_at: '2021-10-26T10:19:13.990Z',
                        updated_at: '2021-10-26T10:19:13.990Z',
                      },
                      {
                        id: 12,
                        name: 'Salad',
                        calories: 100,
                        meal_id: 3,
                        created_at: '2021-10-26T10:19:13.994Z',
                        updated_at: '2021-10-26T10:19:13.994Z',
                      },
                      {
                        id: 13,
                        name: 'Feta Cheese',
                        calories: 110,
                        meal_id: 3,
                        created_at: '2021-10-26T10:19:13.998Z',
                        updated_at: '2021-10-26T10:19:13.998Z',
                      },
                    ],
                  },
                ],
              }
          }
          />
        </Provider>
      </BrowserRouter>,
    );
    expect(screen.getByText('Recorded Meals:')).toBeInTheDocument();
  });
});
