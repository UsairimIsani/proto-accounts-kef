/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
/* eslint-disable arrow-parens */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Form, Input, Icon, Button, notification } from 'antd';
import { connect } from 'react-redux';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      emailId: '',
      confirmpassword: '',
    };
    this.initState = this.state;
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSignUp = e => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      emailId,
      password,
      confirmpassword,
    } = this.state;
    const username = emailId.slice(0, emailId.indexOf('@'));

    if (password === confirmpassword) {
      const user = {
        firstName,
        lastName,
        emailId,
        password,
        username,
      };

      // check if user already exists
      const userExist = this.props.users.find(usr => {
        return usr.username.toLowerCase() === user.username.toLowerCase();
      });

      if (!userExist) {
        this.props.addUser(user);
        // clear form  inputs
        this.setState(this.initState);
        // redirecting to sign in page
        this.props.history.push('/signin');
      } else {
        notification.open({
          message: 'User already exists!',
          description: 'Please sign in or use any other email to sign up!',
          style: {
            width: 300,
            marginLeft: 0,
          },
        });
      }
      // ================== //
    } else {
      // alert pwd mismatch using antd
      notification.open({
        message: 'Passwords do not match',
        description: 'Please enter same password to sign up !',
        style: {
          width: 300,
          marginLeft: 0,
        },
      });
    }
  };

  // ========================= //

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
        <h1 style={{ textAlign: 'center' }}> SIGN UP HERE: </h1>

        <Form style={{ textAlign: 'center' }} onSubmit={this.handleSignUp}>
          <Input
            placeholder="First Name"
            name="firstName"
            value={firstName}
            style={{ maxWidth: '400px' }}
            onChange={this.handleChange}
            required
          />
          <br />
          <br />
          <Input
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            style={{ maxWidth: '400px' }}
            onChange={this.handleChange}
            required
          />
          <br />
          <br />
          <Input
            type="email"
            placeholder="Enter your EmailID"
            name="emailId"
            value={emailId}
            style={{ maxWidth: '400px' }}
            onChange={this.handleChange}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            required
          />
          <br />
          <br />
          <Input
            required
            type="password"
            placeholder="password"
            name="password"
            value={password}
            style={{ maxWidth: '400px' }}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <Input
            required
            type="password"
            style={{ maxWidth: '400px' }}
            placeholder="confirm password"
            name="confirmpassword"
            value={confirmpassword}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <Button htmlType="submit" className="signup-btn" type="primary">
            Sign Up
          </Button>
        </Form>
      </div>
    );
  }
}

// ================================= //

const mapStateToProps = state => {
  return {
    users: state.global.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => {
      dispatch({
        type: 'SIGN_UP',
        user,
      });
    },
  };
};

// ======================== //

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
