import React, { useState } from "react";
import { Button,Form,FormGroup,Label,Input } from "reactstrap";
import { FacebookLoginButton } from "react-social-login-buttons";
import './Login.css' 
import EmployeeService from "../services/EmployeeService";

export class SignUp extends React.Component{
  constructor(props){
    super(props)
    this.state={
      username:"",
      password:"",
    }
    this.nameChange=this.nameChange.bind(this)
    this.passwordChange=this.passwordChange.bind(this)
  }
  
  nameChange(event){
    this.setState({username:event.target.value})
  }

  passwordChange(event){
    this.setState({password:event.target.value})
  }

  newRegister(e){
    e.preventDefault();
    let register={username:this.state.username,password:this.state.password}
    console.log(JSON.stringify(register))
    EmployeeService.createLogin(register).then(res=>{
      this.props.history.push('/')
    })
  }

  render(){
        return (
         <Form className="login-form">
        <h1 className="text-center">
            <span className="font-weight-bold ">SignUp</span>
        </h1>
        {/* <h2 className="text-center">Welcome</h2> */}
          <FormGroup >
            <Label>Username </Label>
            <Input type="text" value={this.state.username} onChange={this.nameChange} placeholder="Username" required />
          </FormGroup>
          {/* <FormGroup >
            <Label>Email </Label>
            <Input type="email" placeholder="Email" name="email" value={user.email} onChange={handleInputs} required />
          </FormGroup> */}
          <FormGroup >
            <Label>Password</Label>
            <Input type="password" placeholder="Password" value={this.state.password} onChange={this.passwordChange} required />
          </FormGroup>
          {/* <FormGroup >
            <Label>Confirm Password</Label>
            <Input type="password" placeholder="Confirm Password" name="cpassword" value={user.cpassword} onChange={handleInputs} required />
          </FormGroup> */}
        <Button className="btn-lg btn-dark btn-block text-center" onClick={this.newRegister.bind(this)}>Register</Button>
        <div className="text-center">
            <a href="/">Login</a>
            {/* <span className="p-2">|</span>
            <a href="/forget_password">Forgot Password</a> */}
        </div>
          
      </Form>
        )   
}
}