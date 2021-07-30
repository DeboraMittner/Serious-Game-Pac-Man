import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../../services/Firebase';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
    boxShadow: theme.shadows[10],
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  }
}));

const SignUpPage = function() {
  const classes = useStyles();

  return(
    <React.Fragment>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
    <SignUpForm />
    </div>
    </Container>
  
  </React.Fragment>
)};

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    if(this.props.location.state && this.props.location.state.username){
      this.setState({email: this.props.location.state.username})
    }
  }

  onSubmit = event => {
    const email = event.target.email.value;
    const password = event.target.passwordOne.value;

    if(email && password) {
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push('/');
        
      })
      .catch(error => {
        this.setState({ error });
      });
    }
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' 

    return (
      <React.Fragment>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Private Email Address"
                name="email"
                value={email}
                onChange={this.onChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="passwordOne"
                variant="outlined"
                required
                fullWidth
                id="passwordOne"
                type="password"
                label="Password"
                value={passwordOne}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="passwordTwo"
                variant="outlined"
                required
                fullWidth
                id="passwordTwo"
                type="password"
                value={passwordTwo}
                label="Confirm Password"
                onChange={this.onChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={isInvalid}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        {error && <p>{error.message}</p>}
      </React.Fragment>
    );
  }
}

const SignUpLink = () => (
  <Link href="/signup" variant="body2">{"Don't have an account? Sign Up"}</Link>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(withStyles(styles)(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };