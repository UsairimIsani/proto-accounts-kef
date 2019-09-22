/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-parens */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Input, Icon, Button, notification
} from 'antd';

class SignInPage extends Component {
  state = {
    emailId: '',
    password: '',
  };

  logincheck = () => {
    const { emailId, password } = this.state;
    const getList = JSON.parse(localStorage.getItem('users'));
    getList.forEach(element => {
      if (element.emailId === emailId) {
        if (element.password === password) {
          setTimeout(() => {
            // eslint-disable-next-line no-restricted-globals
            location.replace('/project/logs/all');
          }, 1000);
        }
      }
      // eslint-disable-next-line no-sequences
      if (element.emailId !== emailId && element.password !== password) {
        setTimeout(() => {
          notification.open(
            {
              message: 'USER NOT PRESENT',
              description: 'User not existing, please Signup.',
              style: {
                width: 600,
                marginLeft: 335 - 600,
              },
            },
            1000,
          );
        });
        setTimeout(() => {
          // eslint-disable-next-line no-restricted-globals
          location.replace('/signup');
        }, 2000);
      }
    });
  };

  render() {
    return (
      <div className="sign-in">
        <form style={{ textAlign: 'center' }}>
          <h1> SIGN IN HERE: - </h1>
          <br></br>
          <div>
            <label className="lbl-email"> Email-ID</label>
            <Input
              placeholder="Enter your email"
              style={{ width: '400px' }}
              onChange={e => this.setState({ emailId: e.target.value })}
              prefix={
                <Icon
                  type="user"
                  style={{ color: 'rgba(0,0,0,.25)', width: '40%' }}
                />
              }
            />
          </div>
          <br />
          <label className="lbl-password"> Password </label>
          <Input.Password
            type="password"
            placeholder="Enter your password"
            style={{ width: '400px' }}
            // eslint-disable-next-line react/no-unused-state
            onChange={e => this.setState({ password: e.target.value })}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <br />
          <br />
          <div>
            <Button
              className="Login-btn"
              type="primary"
              onClick={this.logincheck}
            >
              {' '}
              Log in
            </Button>
          </div>
          <br></br>
          <br></br>
          <p>
            {' '}
            If you have not signed up, click{' '}
            <Link className="router-link" to="/signup">
              {' '}
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    );
  }
}
export default SignInPage;
