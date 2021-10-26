import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../app/store';
import Login from '../features/User/Login';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>,
    );
    expect(screen.getByText('Log in to your account')).toBeInTheDocument();
  });
});
