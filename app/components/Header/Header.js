/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { connect } from 'react-redux';
import { Button } from 'antd';

class Header extends React.Component {
  handleLogOut = () => {
    this.props.logout();
  };

  render() {
    return (
      <div className="header">
        <div className="nav-bar">
          <h1>PROTO ACCONTS</h1>

          {/* header links will not be visible if there is no user signedin */}

          {this.props.currentUser ? (
            <div>
              <Link className="router-link" to="/create-project">
                Create New Project
              </Link>
              <Link className="router-link" to="/project/logs/add">
                Add Project Log
              </Link>
              <Link className="router-link" to="/project/logs/all">
                All Logs
              </Link>
              <div style={{ textAlign: 'right' }}>
                <div></div>
                <Button type="danger" ghost onClick={this.handleLogOut}>
                  Log out
                </Button>
              </div>
            </div>
          ) : (
            <Link className="router-link" to="/signin">
              Sign In
            </Link>
          )}
          {/* ====================  */}
        </div>
      </div>
    );
  }
}

// =========================== //

const mapStateToProps = state => {
  return {
    users: state.global.users,
    currentUser: state.global.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch({
        type: 'LOG_OUT',
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
