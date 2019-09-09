import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

class Header extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <div className="nav-bar">
          <h1>PROTO ACCOUNTS</h1>
          <Link className="router-link" to="/create-project">
            Create New Project
          </Link>
          <Link className="router-link" to="/features">
            Project Logs
          </Link>
          <Link className="router-link" to="/signin">
            Sign In
          </Link>
          <Link className="router-link" to="/signup">
            {' '}
            Sign Up{' '}
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
