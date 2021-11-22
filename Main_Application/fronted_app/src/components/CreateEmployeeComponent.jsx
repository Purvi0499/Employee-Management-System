import React, { Component } from 'react'
import { Redirect } from 'react-router';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        const token=localStorage.getItem('token')
        let authorized=true

        if (token==null)
        authorized=false
        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
            password:'',
            project:'',
            projectStatus:'',
            authorized
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId : employee.emailId,
                    password:employee.password,
                    project:employee.project,
                    projectStatus:employee.projectStatus    
                });
            });
        }        
    }
    
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId, password:this.state.password,project:this.state.project,projectStatus:this.state.projectStatus};
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    changePassword(e){
        this.setState({password:e.target.value})
    }

    changeProject(e){
        this.setState({project:e.target.value})
    }
    
    changeProjectStatus(e){
        this.setState({projectStatus:e.target.value})
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {

        if(!this.state.authorized){
        alert("You must have login first")
            return <Redirect to="/login/manager"/>
}
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" type="email" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>
                                        
                                        <div className = "form-group">
                                            <label> Password: </label>
                                            <input placeholder="Password" type="password" name="password" className="form-control" 
                                                value={this.state.password} onChange={this.changePassword.bind(this)}/>
                                        </div>
                                        
                                        <div className = "form-group">
                                            <label> Project: </label>
                                            <select   name="project" className="form-control" value={this.state.project} onChange={this.changeProject.bind(this)}>
                                                <option >AI</option>
                                                <option >ML</option>
                                                <option >Sales Force</option>
                                                <option >Full Stack</option>
                                            </select>        
                                        </div>
                                        
                                        {/* <div className = "form-group">
                                            <label> Project Status: </label>
                                            <select   name="projectStatus" className="form-control" value={this.state.projectStatus} onChange={this.changeProjectStatus.bind(this)}>
                                                <option >Not Started</option>
                                                <option >Started</option>
                                                <option >In </option>
                                                <option >Complete</option>
                                            </select>        
                                        </div> */}

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
