import React from 'react';
import { AuthUserContext } from '../../services/Session';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Linkk from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import SignOutButton from '../SignOut/SignOut';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    background: 'primary',
    boxShadow: 'rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;'
  },
  toolbar: {
    flexWrap: 'wrap'
  },
  toolbarTitle: {
    flexGrow: 1,
    textDecoration: 'none !important'
  },
  link: {
    margin: theme.spacing(1, 1.5),
    textDecoration: 'none !important'
  }
}));

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = function(){
  const classes = useStyles();

  return(
  <React.Fragment>
  <CssBaseline />
<AppBar position="static" color="white" elevation={0} className={classes.appBar}>
<Toolbar className={classes.toolbar}>
  <Linkk variant="h4" color="rgba(240, 46, 170, 0.4)" href="/" noWrap className={classes.toolbarTitle}>
    Pacman
  </Linkk>
  <nav>
    <Linkk variant="button" color="textPrimary" href="/" className={classes.link}>
      Dashboard
    </Linkk>
    <Linkk variant="button" color="textPrimary" href="/account" className={classes.link}>
      Account
    </Linkk>
  </nav>
  <SignOutButton />
</Toolbar>
</AppBar>
</React.Fragment>
)};


const NavigationNonAuth = function(){
  const classes = useStyles();
  
return(
  <React.Fragment>
  <CssBaseline />
<AppBar position="static" color="white" elevation={0} className={classes.appBar}>
<Toolbar className={classes.toolbar}>
  <Linkk variant="h4" color="primary" href="/" noWrap className={classes.toolbarTitle}>
      Pacman
    </Linkk>
  <Button href="/signin" color="rgba(240, 46, 170, 0.4)" variant="outlined" className={classes.link}>
    Sign In
  </Button>
  <Button href="/signup" color="rgba(240, 46, 170, 0.4)" variant="outlined" className={classes.link}>
    Sign Up
  </Button>
</Toolbar>
</AppBar>
</React.Fragment>
)};
export default Navigation;