import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withoutAuthorization = condition => Component => {
  class WithoutAuthorization extends React.Component {
    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
          authUser => {
            if (!condition(authUser)) {
              this.props.history.push('/dashboard');
            }
          },
        );
    }

    componentWillUnmount() {
        this.listener();
    }

    render() {
      return (
         <AuthUserContext.Consumer>
            {authUser =>
                condition(authUser) ? <Component {...this.props} /> : null
            }
        </AuthUserContext.Consumer>);
    }
  }
  
  return compose(
    withRouter,
    withFirebase,
  )(WithoutAuthorization);
};

export default withoutAuthorization;