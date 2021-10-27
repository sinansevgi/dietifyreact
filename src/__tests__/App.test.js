import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../app/store';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<Provider store={store}><App /></Provider>);
  });

  it('renders login component when user is not authenticated', () => {
    render(<Provider store={store}><App /></Provider>);

    expect(screen.getByText('Log in to your account')).toBeInTheDocument();
  });
});
