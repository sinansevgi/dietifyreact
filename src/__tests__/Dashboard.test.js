import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../app/store';
import Dashboard from '../features/Dashboard/Dashboard';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>,
    );
  });
});
