import React from 'react';
import { DatePicker } from 'antd';
import { Button } from 'antd';
import { Input,Tooltip, Icon } from 'antd';

function SignUp() {
    return (
        <div className = 'signup'> 
            <h1> SIGN UP HERE: </h1>
            <Input placeholder="First Name" /><br/>
            <Input placeholder="Last Name" /><br/>
            <Input
      placeholder="Enter your EmailID"
      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
      suffix={
        <Tooltip title="Extra information">
          <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
    /><br/>
            <Input.Password placeholder="password" /><br/>
            <Input.Password placeholder="confirm password" /><br/>
            <div> <Button className='signup-btn' type='primary'> Sign Up </Button> </div>
        </div>
    )
}

export default SignUp