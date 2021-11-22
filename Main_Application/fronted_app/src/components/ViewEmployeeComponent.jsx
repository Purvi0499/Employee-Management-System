import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import { Redirect } from 'react-router-dom'
class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        const token=localStorage.getItem('token')
        let authorized=true

        if (token==null)
        authorized=false

        this.state = {
            id: this.props.match.params.id,
            authorized,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
    }

    render() {

        if(!this.state.authorized){
            alert("You must have login first")
            return <Redirect to="/login/manager"/>
}
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Employee Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Employee First Name: </label>
                            <div> { this.state.employee.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> Employee Last Name: </label>
                            <div> { this.state.employee.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> Employee Email ID: </label>
                            <div> { this.state.employee.emailId }</div>
                        </div>
                        
                        <div className = "row">
                            <label> Employee Project: </label>
                            <div> { this.state.employee.project }</div>
                        </div>
                        
                        <div className = "row">
                            <label> Project Status: </label>
                            <div> { this.state.employee.projectStatus }</div>
                        </div>
                        
                        <div className = "row">
                            <label> Entry Time: </label>
                            <div> { this.state.employee.enterTime}</div>
                        </div>
                        
                        <div className = "row">
                            <label> Exit Time: </label>
                            <div> { this.state.employee.exitingTime}</div>
                        </div>



                    </div>

                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent
