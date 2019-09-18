import React, { Component } from 'react';
import {
  Input, Icon, Button, notification
} from 'antd';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Users: [],
      firstName: '',
      lastName: '',
      emailId: '',
      password: '',
      confirmpassword: '',
    };
  }

  handleSignUp = () => {
    const {
      firstName,
      lastName,
      emailId,
      password,
      confirmpassword,
      // eslint-disable-next-line no-unused-vars
      Users
    } = this.state;
    // eslint-disable-next-line no-unused-vars
    const user = {
      firstName,
      lastName,
      emailId,
      password,
    };
    if (password !== confirmpassword) {
      // eslint-disable-next-line no-alert
      alert("Passwords don't match");
    }
    const localUsers = JSON.parse(localStorage.getItem('users'));

    let userExist = false;
    if (localUsers.length) {
      localUsers.forEach((element) => {
        if (element.emailId === emailId) {
          userExist = true;
          setTimeout(() => {
            notification.open({
              message: 'USER EXIST',
              description:
                'User already exist, proceed to Signin.',
              style: {
                width: 600,
                marginLeft: 335 - 600,
              },
            });
          }, 1000);
          setTimeout(() => {
            // eslint-disable-next-line no-restricted-globals
            location.replace('/signin');
          }, 2000);
        }
      });
    }
    if (!userExist) {
      localUsers.push(user);
      localStorage.setItem('users', JSON.stringify(localUsers));
      setTimeout(() => {
        // eslint-disable-next-line no-restricted-globals
        location.replace('/signin');
      }, 1000);
    }
  };

  render() {
    const {
      firstName,
      lastName,
      emailId,
      password,
      confirmpassword,
    } = this.state;
    return (
      <div className="signup">
        <form style={{ textAlign: 'center' }}>
          <h1> SIGN UP HERE: </h1>
          <Input
            placeholder="First Name"
            id="firstName"
            value={firstName}
            style={{ width: '400px' }}
            onChange={(e) => this.setState({ firstName: e.target.value })}
          />
          <br />
          <br />
          <Input
            placeholder="Last Name"
            id="lastName"
            value={lastName}
            style={{ width: '400px' }}
            onChange={(e) => this.setState({ lastName: e.target.value })}
          />
          <br />
          <br />
          <Input
            placeholder="Enter your EmailID"
            id="emailID"
            value={emailId}
            style={{ width: '400px' }}
            onChange={(e) => this.setState({ emailId: e.target.value })}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <br />
          <br />
          <Input.Password
            placeholder="password"
            id="password"
            value={password}
            style={{ width: '400px' }}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <br />
          <br />
          <Input.Password
            placeholder="confirm password"
            value={confirmpassword}
            style={{ width: '400px' }}
            onChange={(e) => this.setState({ confirmpassword: e.target.value })}
          />
          <br />
          <br />
          <div>
            {' '}
            <Button
              className="signup-btn"
              type="primary"
              onClick={this.handleSignUp}
            >
              {' '}
              Sign Up{' '}
            </Button>{' '}
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
