import React from "react";

export class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }

    employeeLogin(){
        this.props.history.push("/login/employee")
    }
    
    managerLogin(){
        this.props.history.push("/login/manager")
    }
    // className=""
    render(){
        return (
            <div className="container text-center">
                <h1 className="text-center ">Welcome</h1>
                <br />
                <button className="btn btn-lg btn-dark btn-block text-center" onClick={this.employeeLogin.bind(this)}>Employee Login</button>
                <br />
                <br />
                <br />
                <button className="btn btn-lg btn-dark btn-block text-center" onClick={this.managerLogin.bind(this)}>Manager Login</button>
                
            </div>
        )
    }
}