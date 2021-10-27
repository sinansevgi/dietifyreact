import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../app/store';
import Food from '../features/Food/Food';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Food />
        </Provider>
      </BrowserRouter>,
    );
    expect(screen.getByText('No Foods Found')).toBeInTheDocument();
  });
});
