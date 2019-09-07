/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { DatePicker } from 'antd';

class Header extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header" style={{ background: '#fff000' }}>
        <div className="nav-bar">
          <h1>PROTO ACCONTS</h1>
          <Link className="router-link" to="/create-project">
            Create New Project
          </Link>
          <Link className="router-link" to="/project/logs/add">
            Add Project Log
          </Link>
          <Link className="router-link" to="/project/logs/all">
            All Logs
          </Link>
          <Link className="router-link" to="/signin">
            Sign In
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
