import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../app/store';
import Signup from '../features/User/Signup';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Signup />
        </Provider>
      </BrowserRouter>,
    );
    expect(screen.getByText('Sign Up to your account')).toBeInTheDocument();
  });
});
