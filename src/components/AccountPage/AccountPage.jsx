import React from 'react';

import { PasswordForgetForm } from '../PasswordForgetForm/PasswordForgetForm';
import PasswordChangeForm from '../PasswordChangeForm/PasswordChangeForm';
import { AuthUserContext, withAuthorization } from '../../services/Session';
import { withFirebase } from '../../services/Firebase';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  boox: {
    background: theme.palette.background.paper,
    borderRadius: '10px',
    padding: '1.5em',
    margin: theme.spacing(4),
    boxShadow: 'rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;'
  },
}))


const AccountPage = function({ firebase }){
  const classes = useStyles(); 

  return(  
  <Container>
    <Box boxShadow={3} className={classes.boox}>
  <AuthUserContext.Consumer>
    
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
  
      </div>
    )}
  </AuthUserContext.Consumer>
  </Box>
  </Container>)

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withFirebase(AccountPage));