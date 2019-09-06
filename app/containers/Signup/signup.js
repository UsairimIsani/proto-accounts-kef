import React, { Component } from 'react';
import { DatePicker } from 'antd';
import { Button } from 'antd';
import { Input,Tooltip, Icon } from 'antd';

class SignUp extends Component {
    state = {
        Users : [],
        firstName:'',
        lastName:'',
        emailId:'',
        password:'',
        confirmpassword:''
    }
    handleSignUp = (e) => {
        let user = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            emailId:this.state.emailId,
            password:this.state.password
        }; 
        let user_found =false;
        if (!user_found){
            let users = this.state.Users.slice();
            this.setState({Users:users.push(user)});
            localStorage.setItem("users",JSON.stringify(users));
        }
        const { password, confirmpassword } = this.state;
        if (password !== confirmpassword) {
            alert("Passwords don't match");
        } else {}   
    }   
    render () {

        return (
            <div className = 'signup'> 
                <form>
                    <h1> SIGN UP HERE: </h1>
                    <Input placeholder="First Name" id='firstName' value={this.state.firstName} onChange={(e)=>this.setState({firstName:e.target.value})}/><br/><br />
                    <Input placeholder="Last Name" id='lastName' value={this.state.lastName} onChange={(e)=>this.setState({ lastName:e.target.value})} /><br/><br />
                    <Input placeholder="Enter your EmailID" id='emailID' value={this.state.emailId} onChange={(e)=>this.setState({ emailId:e.target.value})} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} suffix={
                            <Tooltip title="Extra information">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>} /><br/><br />
                    <Input.Password placeholder="password" id='password' value={this.state.password}  onChange={(e)=>this.setState({ password:e.target.value  })} /><br/><br />
                    <Input.Password placeholder="confirm password" value={this.state.confirmpassword} onChange={(e)=>this.setState({ confirmpassword:e.target.value  })} /><br/><br />
                    <div> <Button className='signup-btn' type='primary' onClick= {this.handleSignUp}> Sign Up </Button> </div>
                </form>
            </div>
        )
    }
}

export default SignUp