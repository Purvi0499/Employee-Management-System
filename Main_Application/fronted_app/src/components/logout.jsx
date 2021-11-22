import React from "react";
import EmployeeService from "../services/EmployeeService";

export class Logout extends React.Component{
    constructor(props){
        super(props)
        this.state={id:this.props.match.params.id,email:''}
        if(this.state.id==='manager'){
        localStorage.removeItem('token')}
        else{
            EmployeeService.getEmployeeById(this.state.id).then(res=>{
                console.log(res.data)
                console.log(localStorage)
                localStorage.removeItem(res.data.emailId)
            })
        }
    }

  
    click(){
        this.props.history.push("/")
    }

    render(){
        return (
            <div className="container text-center">
                <h1>You have been logged out </h1>
                <br />
                <br />
                <button className="btn-lg btn-dark btn-block text-center" onClick={this.click.bind(this)}>Login</button>
            </div>
        )
    }
}