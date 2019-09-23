/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';

import posed from 'react-pose';

// ============================= //

const HeaderTop = posed.div({
  enter: {
    opacity: 1,
    y: 1,
    delayChildren: 500,
    staggerChildren: 300,
  },
  exit: {
    opacity: 0,
    y: -1000,
  },
});
const HeaderTopChild = posed.div({
  enter: {
    opacity: 1,
    y: 1,
  },
  exit: {
    opacity: 0,
    y: -1000,
  },
});

// ============================== //

const NavLinks = posed.div({
  enter: {
    opacity: 1,
    y: 1,
    delayChildren: 1000,
    staggerChildren: 500,
  },
  exit: {
    opacity: 0,
    y: -1000,
  },
});
const Navchild = posed.div({
  enter: {
    opacity: 1,
    x: 1,
  },
  exit: {
    opacity: 0,
    x: -1000,
  },
});

// ============================== //

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headeranimation: false,
      navanimation: false,
    };
    setTimeout(() => {
      this.setState({ headeranimation: true, navanimation: true });
    }, 300);
  }

  handleLogOut = () => {
    // sets current user to ''
    this.props.logout();
    this.props.history.push('/signin');
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className="header">
        <HeaderTop
          className="top"
          pose={!this.state.headeranimation ? 'exit' : 'enter'}
        >
          <HeaderTopChild style={{ width: '70%' }}>
            <h1 className="title">PROTO ACCONTS</h1>
          </HeaderTopChild>
          <HeaderTopChild className="signinout">
            {currentUser ? (
              <div className='signindiv'>
                <span className="nameicon">
                  {this.props.currentUser.slice(0, 1).toUpperCase()}
                </span>
                <span style={{ width: '50%', margin: '30px' }}>
                  <Button
                    type="danger"
                    size="large"
                    ghost
                    onClick={this.handleLogOut}
                  >
                    Log out
                  </Button>
                </span>
              </div>
            ) : (
              <Link to="/signin">
                <Button ghost size="large">
                  Sign In
                </Button>
              </Link>
            )}
          </HeaderTopChild>
        </HeaderTop>
        <div>
          {/* header links will not be visible if there is no user signedin */}
          {currentUser ? (
            <NavLinks
              className="nav-bar"
              pose={!this.state.navanimation ? 'exit' : 'enter'}
            >
              <Navchild className="router-link">
                <Link to="/create-project" style={{ color: '#41addd' }}>
                  Create New Project
                </Link>
              </Navchild>              <Navchild className="router-link">
                <Link to="/project/logs/add" style={{ color: '#41addd' }}>
                  Add Project Log
                </Link>
              </Navchild>
              <Navchild className="router-link">
                <Link to="/project/logs/all" style={{ color: '#41addd' }}>
                  All Logs
                </Link>
              </Navchild>

            </NavLinks>
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
