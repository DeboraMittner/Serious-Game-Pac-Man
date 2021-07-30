import React from 'react';
import { withFirebase } from '../../services/Firebase';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  appBarButton: {
    margin: theme.spacing(1, 1.5),
    color: 'rgba(240, 46, 170, 0.4)'
  }
}));

const SignOutButton = function({ firebase }) {
  const classes = useStyles();

  return(
  <Button onClick={firebase.doSignOut} variant="outlined" className={classes.appBarButton}>
  Sign Out
</Button>
)};

export default withFirebase(SignOutButton);