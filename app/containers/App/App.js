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

  componentDidUpdate = () => {
    const { currentUser } = this.props;
    if (currentUser) {
      if (location.pathname === '/signin') {
        this.props.history.push('/create-project');
      }
    }
  };

  render() {
    // redirection to new page when logged in
    const { currentUser, projects } = this.props;

    return (
      <div className="app-wrapper">
        <Header />
        <div className="compo">
          <Switch>
            {currentUser ? (
              <div>
                <Route path="/create-project" component={CreateProject} />
                {/* project logs will be accessable only if a project is added */}
                {projects.length ? (
                  <div>
                    <Route
                      path="/project/logs/add"
                      component={AddProjectLogs}
                    />
                    <Route path="/project/logs/all" component={AllLogs} />
                  </div>
                ) : null}
              </div>
            ) : (
              <div>
                <Route exact path="/signin" component={SignInPage} />
                <Route path="/signup" component={SignUp} />
              </div>
            )}
          </Switch>
        </div>
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
  projects: state.global.projects,
});

// ========================== //

export default withRouter(connect(mapStateToProps)(App));
