import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import SignUpPage from './components/SignUpPage/SignUpPage';
import SignInPage from './components/SignInPage/SignInPage';
import PasswordForgetForm from './components/PasswordForgetForm/PasswordForgetForm';
import DashboardPage from './components/DashboardPage/DashboardPage';
import AccountPage from './components/AccountPage/AccountPage';

import { withAuthentication } from './services/Session';

import './App.css';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import CreateGamePage from './components/CreateGamePage/CreateGamePage';
import Pacman from './components/GamePage/Pacman'


const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1b41'
    },
    secondary: {
      main: '#BAFF29'
    }
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
  <React.Fragment>
    <CssBaseline />
    <Router>
      <div>
        <Navigation />
        <Route exact path={"/"} component={DashboardPage} />
        <Route path={"/signup"} component={SignUpPage} />
        <Route path={"/signin"} component={SignInPage} />
        <Route path={"/pwforget"} component={PasswordForgetForm} />
        <Route path={"/create"} component={CreateGamePage} />
        <Route path={"/account"} component={AccountPage} />
        <Route path={"/play"} component={Pacman} />
      </div>
    </Router>
  </React.Fragment>
  </ThemeProvider>
);

export default withAuthentication(App);
