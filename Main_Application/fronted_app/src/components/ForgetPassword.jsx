import React from "react";
import { Button,Form,FormGroup,Label,Input } from "reactstrap";
import { Redirect } from "react-router-dom";
// import { FormGroup, Label } from "reactstrap";
import './Login.css'
import EmployeeService from "../services/EmployeeService";
export class Forget extends React.Component{
    constructor(props){
        super(props)
        this.state={id:this.props.match.params.id,username:'',password:'',cnfpassword:''}
    }

    forgetButton(e){
        e.preventDefault();
        if (this.state.password!=this.state.cnfpassword){
        alert("Password and confirm password did not match")
        this.props.history.push('/forget_password/manager')}
        
        else{
            if (this.state.id==='manager'){
            let resetData={username:this.state.username}
            EmployeeService.resetManager(this.state.password,resetData).then(res=>{
                if (res.data==='Success'){
                    alert("password reset successfully")
                    this.props.history.push(`/login/${this.state.id}`)
                }
                else{
                    alert("Invalid Username!")
                    this.props.history.push('/forget_password/manager')
                }
            })
        }
        else{
            let resetData={emailId:this.state.username}
            EmployeeService.resetEmployee(this.state.password,resetData).then(res=>{
                if(res.data==='Success'){
                    alert("Password reset Successfully..")
                    this.props.history.push('/login/employee')
                }
                else{
                    alert("Username is not valid please use correct Username")
                    this.props.history.push('/forget_password/employee')
                }
            })
        }
    }
    }
    render(){
        return (
            <div>
                <form className="login-form">
                    <h1 className="text-center font-weight-bold">Reset Password</h1>
                    <FormGroup >
                        <Label >Username</Label>
                        <Input type="text" value={this.state.username} onChange={(e)=> this.setState({username:e.target.value})} required></Input>
                        {/* <Input type="password" value={this.state.password} onChange={(e)=> this.setState({password:e.target.value})}></Input>
                        <Input type="password" value={this.state.cnfpassword} onChange={(e)=> this.setState({cnfpassword:e.target.value})}></Input> */}
                    </FormGroup>
                    
                    <FormGroup>
                        <Label>Password</Label>
                        {/* <Input type="text" value={this.state.username} onChange={(e)=> this.setState({username:e.target.value})}></Input> */}
                        <Input type="password" value={this.state.password} onChange={(e)=> this.setState({password:e.target.value})} required></Input>
                        {/* <Input type="password" value={this.state.cnfpassword} onChange={(e)=> this.setState({cnfpassword:e.target.value})}></Input> */}
                    </FormGroup>
                    
                    <FormGroup>
                        <Label>Confirm Password</Label>
                        {/* <Input type="text" value={this.state.username} onChange={(e)=> this.setState({username:e.target.value})}></Input>
                        <Input type="password" value={this.state.password} onChange={(e)=> this.setState({password:e.target.value})}></Input> */}
                        <Input type="password" value={this.state.cnfpassword} onChange={(e)=> this.setState({cnfpassword:e.target.value})} required></Input>
                    </FormGroup>
                    
                    <Button className="btn btn-lg btn-dark btn-block text-center" onClick={this.forgetButton.bind(this)}>Reset</Button>    
                </form>
            </div>
        )
    }
}