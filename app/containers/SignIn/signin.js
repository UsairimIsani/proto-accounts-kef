/* eslint-disable lines-between-class-members */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-parens */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Icon, Button, notification } from 'antd';

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.initState = this.state;
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSignIn = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  render() {
    return (
      <div className="sign-in">
        <Form style={{ textAlign: 'center' }} onSubmit={this.handleSignIn}>
          <h1> SIGN IN HERE: - </h1>
          <br></br>
          <div>
            <label className="lbl-email"> Email / Username</label>
            <br />
            <Input
              required
              name="email"
              placeholder="Email or username"
              style={{ maxWidth: '400px' }}
              onChange={this.handleChange}
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
          <br />
          <Input.Password
            required
            type="password"
            placeholder="Password"
            style={{ maxWidth: '400px' }}
            name="password"
            onChange={this.handleChange}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <br />
          <br />
          <div>
            <Button htmlType="submit" type="primary">
              Log in
            </Button>
          </div>
          <br></br>
          <br></br>
          <p>
            If you have not signed up, click <Link to="/signup">Sign Up</Link>
          </p>
        </Form>
      </div>
    );
  }
}

// ===================== //

const mapStateToProps = state => {
  return {
    currentUser: state.global.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: user => {
      dispatch({
        type: 'LOG_IN',
        user,
      });
    },
  };
};
export default connect(
  // null,
  mapStateToProps,
  mapDispatchToProps,
)(SignInPage);
