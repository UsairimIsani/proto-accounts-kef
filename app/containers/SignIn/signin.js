import React from 'react';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import { Button } from 'antd';
import { Input, Tooltip, Icon } from 'antd';

function SignInPage() {
  return (
    <div className= 'sign-in'>
    <h1> SIGN IN HERE: - </h1>
    <br></br>
        <label className = 'lbl-email'> Email-ID</label>
        <Input
      placeholder="Enter your email"
      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
      suffix={
        <Tooltip title="Extra information">
          <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
    />
        <label className='lbl-password'> Password </label>
        <Input
      placeholder="Enter your password"
      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
      suffix={
        <Tooltip title="Extra information">
          <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
    /><br />
    <br />
        <div><Button className='Login-btn' type='primary'> Log in</Button></div>
        <br></br>
        <br></br>
        <p> If you have not signed up, click <Link className='router-link' to='/signup'> Sign Up</Link></p> 
    </div>
  );
}
export default SignInPage