/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import AddProjectLogs from 'containers/ProjectLogs/Add';
import AllLogs from 'containers/ProjectLogs/All';
import CreateProject from 'containers/Create/Modal';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SignInPage from 'containers/SignIn/signin';
import SignUp from 'containers/Signup/signup';
import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - React.js Boilerplate"
      defaultTitle="React.js Boilerplate"
    >
      <meta name="description" content="A React.js Boilerplate application" />
    </Helmet>
    <Header />
    <Switch>
      <Route path="/create-project" component={CreateProject} />
      <Route exact path="/project/logs/add" component={AddProjectLogs} />
      <Route exact path="/project/logs/all" component={AllLogs} />
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

export default App;
