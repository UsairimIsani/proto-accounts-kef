/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

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
  constructor(props) {
    super(props);
    if (localStorage.getItem('users') === undefined) {
      localStorage.setItem('users', JSON.stringify([]));
    }
  }

  render() {
    return (
      <div className="app-wrapper">
        <Header />
        <Switch>
          <Route path="/create-project" component={CreateProject} />
          <Route path="/project/logs/add" component={AddProjectLogs} />
          <Route path="/project/logs/all" component={AllLogs} />
          <Route exact path="/signin" component={SignInPage} />
          <Route path="/signup" component={SignUp} />
          
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

export default App;
