/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Input, Tooltip, Icon, Button
} from 'antd';

function SignInPage() {
  return (
    <div className="sign-in">
    <form style={{textAlign: 'center'}}>
      <h1> SIGN IN HERE: - </h1>
      <br></br>
      <div><label className="lbl-email"> Email-ID</label>
        <Input
          placeholder="Enter your email"
          style = {{width:'400px'}}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)', width:'40%' }} />}
        />
      </div><br />
      <label className="lbl-password"> Password </label>
      <Input
        placeholder="Enter your password"
        style = {{width:'400px'}}
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
      />
      <br />
      <br />
      <div><Button className="Login-btn" type="primary"> Log in</Button></div>
      <br></br>
      <br></br>
      <p> If you have not signed up, click <Link className="router-link" to="/signup"> Sign Up</Link></p></form>
    </div>
  );
}
export default SignInPage;
