import React from 'react';
import './assets/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './features/User/Login';
import Signup from './features/User/Signup';
import Dashboard from './features/Dashboard/Dashboard';
import PrivateRoute from './helpers/PrivateRoute';

const App = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route component={Login} path="/login" />
        <Route component={Signup} path="/signup" />
        <PrivateRoute path="/" component={Dashboard} />
      </Switch>
    </Router>
  </div>
);

export default App;
