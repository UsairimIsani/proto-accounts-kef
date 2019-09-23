/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';

// ============================= //

class Header extends React.Component {
  handleLogOut = () => {
    // sets current user to ''
    this.props.logout();
    this.props.history.push('/signin');
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className="header">
        <div className="top">
          <h1>PROTO ACCONTS</h1>
          <div>
            {currentUser ? (
              <Button
                type="danger"
                size="large"
                ghost
                onClick={this.handleLogOut}
              >
                Log out
              </Button>
            ) : (
              <Link to="/signin">
                <Button ghost size="large">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* =========  */}
        </div>
        <div>
          {/* header links will not be visible if there is no user signedin */}
          {currentUser ? (
            <div className="nav-bar">
              <Link className="router-link" to="/create-project">
                Create New Project
              </Link>
              <Link className="router-link" to="/project/logs/add">
                Add Project Log
              </Link>
              <Link className="router-link" to="/project/logs/all">
                All Logs
              </Link>
            </div>
          ) : null}

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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Header),
);
