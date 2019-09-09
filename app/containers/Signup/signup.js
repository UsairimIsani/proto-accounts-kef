import React, { Component } from 'react';
import {
 Input, Tooltip, Icon, Button, notification 
} from 'antd';

class SignUp extends Component {
 state = {
   Users: [],
   firstName: '',
   lastName: '',
   emailId: '',
   password: '',
   confirmpassword: '',
 };

  handleSignUp = () => {
    const {
      firstName,
      lastName,
      emailId,
      password,
      confirmpassword,
      Users,
    } = this.state;
    // eslint-disable-next-line no-unused-vars
    const user = {
      firstName,
      lastName,
      emailId,
      password,
    };
    const userFound = false;
    if (!userFound) {
      // const users = Users.slice();
      // eslint-disable-next-line no-const-assign
      const usersAdd = [...Users, user];
      this.setState({ Users: usersAdd });
      localStorage.setItem('users', JSON.stringify(usersAdd));
    }

    if (password !== confirmpassword) {
      // eslint-disable-next-line no-alert
      alert("Passwords don't match");
    }
    const isPresent = JSON.parse(localStorage.getItem('users'));
    let found = false;
    isPresent.forEach((element) => {
      // eslint-disable-next-line no-console
      console.log(element);
      // eslint-disable-next-line react/destructuring-assignment
      if (element.emailId === this.state.emailId) {
        found = !found;
      }
    });
    if (found) {
      // eslint-disable-next-line no-restricted-globals
      setTimeout(() => {
        notification.open({
          message: 'Notification Title',
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          style: {
            width: 600,
            marginLeft: 335 - 600,
          },
        });
        // eslint-disable-next-line no-restricted-globals
        location.replace('/signin');
      }, 4000);
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
        <form style = {{textAlign:'center'}}>
          <h1> SIGN UP HERE: </h1>
          <Input
            placeholder="First Name"
            id="firstName"
            value={firstName}
            style={{width:'400px'}}
            onChange={(e) => this.setState({ firstName: e.target.value })}
          />
          <br />
          <br />
          <Input
            placeholder="Last Name"
            id="lastName"
            value={lastName}
            style={{width:'400px'}}
            onChange={(e) => this.setState({ lastName: e.target.value })}
          />
          <br />
          <br />
          <Input
            placeholder="Enter your EmailID"
            id="emailID"
            value={emailId}
            style={{width:'400px'}}
            onChange={(e) => this.setState({ emailId: e.target.value })}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
           />
          <br />
          <br />
          <Input.Password
            placeholder="password"
            id="password"
            value={password}
            style={{width:'400px'}}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <br />
          <br />
          <Input.Password
            placeholder="confirm password"
            value={confirmpassword}
            style={{width:'400px'}}
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
