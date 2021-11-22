import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import { Redirect } from 'react-router-dom'
class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        const token=localStorage.getItem('token')
        let authorized=true
        
        if (token===null)
            authorized=false
        this.state = {
                employees: [],
                authorized
        }

        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            console.log(res.data)
            EmployeeService.getEmployees().then(res=>{
                this.setState({employees:res.data})
            })
            // this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    

    render() {
        if(!this.state.authorized){
            alert("You must have login first")
            return <Redirect to="/login/manager"/>
        }

        return (
            <div>
                 <h2 className="text-center">Employees List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Employee First Name</th>
                                    <th> Employee Last Name</th>
                                    <th> Employee Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                             <td> { employee.firstName} </td>   
                                             <td> {employee.lastName}</td>
                                             <td> {employee.emailId}</td>
                                             <td>
                                                 <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )   
                                }
                            </tbody>
                        </table>
                        <div>
                            <button className="btn-lg btn-dark btn-block text-center" onClick={()=> this.props.history.push('/logout/manager')}>Logout</button>
                        </div>            
                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
