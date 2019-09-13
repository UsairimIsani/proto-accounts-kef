/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import './style.scss';

<<<<<<< HEAD
export default class HomePage extends React.PureComponent { 

=======
export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  constructor(props) {
    super(props);  
  }
  componentDidMount() {
    const { username, onSubmitForm } = this.props;
    if (username && username.trim().length > 0) {
      onSubmitForm();
    }
  }
>>>>>>> 34c2ea658158286c9ecae4fbbc36a356b7c296ba
  render() {
    return (
<<<<<<< HEAD
      <div className='homepage'>
      
      </div>
=======
      <article>
    
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div className="home-page">
          <section className="centered">
            <h2>Start your next react project in seconds</h2>
            <p>
              To enter details of a new <i>PROTODROP project</i> kindly fill the form. 
            </p>
          </section>
          <section>
            <h2>Try me!</h2>
            <div>
      </div>
            <ReposList {...reposListProps} />
          </section>
        </div>
      </article>
>>>>>>> 34c2ea658158286c9ecae4fbbc36a356b7c296ba
    );
  }
}