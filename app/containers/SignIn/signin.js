import React from 'react';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import { Button } from 'antd';

function SignInPage() {
  return (
    <div className= 'sign-in'>
    <h1> SIGN IN HERE: - </h1>
    <br></br>
        <label className = 'lbl-email'> Email-ID</label>
        <input type='email' placeholder='Add email-id'></input>
        <label className='lbl-password'> Password </label>
        <input type= 'password' placeholder = 'Add password' />
        <div><Button className='Login-btn' type='primary'> Log in</Button></div>
        <br></br>
        <br></br>
        <p> If you have not signed up, click <Link className='router-link' to='/signup'> Sign Up</Link></p> 
    </div>
  );
}
export default SignInPage