/* eslint-disable arrow-parens */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import React, { Component } from 'react';
import AddProjectLogs from 'containers/ProjectLogs/Add';
import AllLogs from 'containers/ProjectLogs/All';
import CreateProject from 'containers/Create/Modal';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SignInPage from 'containers/SignIn/signin';
import SignUp from 'containers/Signup/signup';
import { Route, Switch } from 'react-router-dom';
import './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  componentDidMount = () => {
    const { users } = this.props;
    if (!users.length) {
      this.props.history.push('/signup');
    }
  };

  render() {
    // redirection to new page when logged in
    if (location.pathname == '/signin' && this.props.currentUser) {
      this.props.history.push('/create-project');
    }

    const { users, currentUser } = this.props;

    return (
      <div className="app-wrapper">
        <Header />
        <Switch>
          {currentUser ? (
            <div>
              <Route path="/create-project" component={CreateProject} />
              <Route path="/project/logs/add" component={AddProjectLogs} />
              <Route path="/project/logs/all" component={AllLogs} />
            </div>
          ) : (
            <div>
              <Route exact path="/signin" component={SignInPage} />
              <Route path="/signup" component={SignUp} />
            </div>
          )}
        </Switch>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Footer />
      </div>
    );
  }
}

// ============================ //

const mapStateToProps = state => ({
  users: state.global.users,
  currentUser: state.global.currentUser,
});

// ========================== //

export default withRouter(connect(mapStateToProps)(App));
