import React from "react";
import { Button,Form,FormGroup,Label,Input } from "reactstrap";
import { FacebookLoginButton } from "react-social-login-buttons";
import './Login.css' 
import EmployeeService from "../services/EmployeeService";
import { Redirect } from "react-router-dom";
// import JsonWebToekn from JsonWebToekn
export class Login extends React.Component{
    constructor(props){
      // const token=localStorage.getItem('token')
      let authorized=false;
      // if (token==null)
      //   authorized=false
        super(props)
        this.state={id:this.props.match.params.id , username:"", password:"", authorized}
    }

    loginName(event){
      this.setState({username:event.target.value})
    }

    loginPassword(event){
      this.setState({password:event.target.value})
    }

    forgetClick(e){
      e.preventDefault();
      this.props.history.push(`/forget_password/${this.state.id}`)
    }
    
    login(event){
      event.preventDefault();
      if (this.state.id==="manager"){
        let loginData={username:this.state.username,password:this.state.password}
        EmployeeService.managerLogin(loginData).then(res=>{
          console.log(res.data)
          if (res.data==='redirect:/employees'){
            this.setState({authorized:true})
            
            localStorage.setItem('token',Date.now())
            this.props.history.push('/employees')
          }
          else{
            alert("Invalid Credentials!!")      
            this.setState({authorized:false})
            this.props.history.push("/login/manager")
          }  
        })
      }
      
      else{   
        let loginData={emailId:this.state.username,password:this.state.password}
        EmployeeService.getLogin(loginData).then(res=>{
        console.log(res)
        if (res.data===0){
          alert("Invalid Credentials!!");
          this.props.history.push('/login/employee');
        }
        else{
          localStorage.setItem(`${this.state.username}`,Date.now());
          this.props.history.push(`/empHome/${res.data}`)
        }
      })
    }}

    getTitle(){
      if(this.state.id === 'manager'){
          return <h3 className="text-center">Welcome, Manager</h3>
      }else{
          return <h3 className="text-center">Welcome, Employee</h3>
      }
  }
    render(){

      // if(this.state.authorized)
      //   return this.props.history.push("/employees")

        return <Form className="login-form">
        <h1 className="text-center">
            <span className="font-weight-bold ">Login</span>
        </h1>
        <div>
            {this.getTitle()}
        </div>
        {/* <h2 className="text-center">Welcome</h2> */}
          <FormGroup >
            <Label>Username </Label>
            <Input type="text" placeholder="Username" value={this.state.username} onChange={this.loginName.bind(this)} required />
          </FormGroup>
          <FormGroup >
            <Label>Password</Label>
            <Input type="password" placeholder="Password" value={this.state.password} onChange={this.loginPassword.bind(this)} required />
          </FormGroup>
        <Button className="btn-lg btn-dark btn-block text-center" onClick={this.login.bind(this)}>Login</Button>
        <div className="text-center pt-3">
            Or continue with your social account
        </div>
        <FacebookLoginButton className="mt-3 mb-3"/>
        <div className="text-center">
              {/* <a href="/signUp">SignUp</a>
              <span className="p-2">|</span> */}
              <Button className="btn btn-lg btn-dark btn-block" onClick={this.forgetClick.bind(this)}>Forgot Password</Button>
            {/* <a href="/forget_password">Forgot Password</a> */}
        </div>
        {/* <App/> */}
      </Form>
    }
}