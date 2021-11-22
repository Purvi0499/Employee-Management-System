import React from "react";
import EmployeeService from "../services/EmployeeService";
import {Redirect} from 'react-router-dom'
import { Button,Form,FormGroup,Label,Input } from "reactstrap";

export class EmployeeHome extends React.Component{
    constructor(props){
        super(props)
        let authorized=true
        this.state={id:this.props.match.params.id,firstName:'',lastName:'',emailId:'',status:'',password:'',project:'',authorized,entertime:'',exittime:''}
    }
        
    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then(res=>{
            this.setState({firstName:res.data.firstName})
            this.setState({lastName:res.data.lastName})
            this.setState({emailId:res.data.emailId})
            this.setState({project:res.data.project})
            this.setState({password:res.data.password})
            const token=localStorage.getItem(this.state.emailId)
            if(token==null)
                this.setState({authorized:false})
        })
    }

    statusChange(event){
        this.setState({status:event.target.value})
    }

    // ()

    changeButton(){
        let emp={projectStatus:this.state.status,firstName:this.state.firstName,lastName:this.state.lastName,emailId:this.state.emailId,password:this.state.password,project:this.state.project}
        EmployeeService.updateStatus(emp,this.state.id).then(res=>{
            alert("status changed successfully...")
            console.log(res.data)  
        })
    }

    enterTime(e){
        e.preventDefault();
        let enter=document.getElementById('enter')
        enter.setAttribute('disabled','true')
        let empdata={enterTime:this.state.entertime}
        EmployeeService.enterTime(this.state.id,empdata).then(res=>{
            console.log(res.data)
        })
    }
    
    exitTime(e){
        let enter=document.getElementById('exit')
        enter.setAttribute('disabled','true')
        e.preventDefault();
        let empdata={exitingTime:this.state.exittime}
        EmployeeService.exitTime(this.state.id,empdata).then(res=>{
            console.log(res.data)
        })
    }

    render(){

        if(!this.state.authorized){
            alert("You must login first!!")
            this.props.history.push('/login/employee')
        }
        
        return (
            <div className="container">
                <h1 className="text-center">Welcome {this.state.firstName}</h1>
                <br />
                <div className="text-center ">
                    <h2 className="text-center ">Update Your Work Status</h2>
                    <br />
                    <select value={this.state.status} onChange={this.statusChange.bind(this)}>
                        <option >Not Started</option>
                        <option >Started</option>
                        <option >In progress</option>
                        <option >Completed</option>
                    </select>
                    <br />
                    <br />

                    <div>
                        <button className="btn-lg btn-dark btn-block text-center" onClick={this.changeButton.bind(this)}>Change</button>
                    </div>

                    <br />
                    <br />

                    <div className="text-center">
                        <Label  style={{fontSize: "10px"},{fontWeight:"bold"}}>Entry Time:  </Label>
                        <input id="enter"  type="time"  value={this.state.entertime} style={{marginLeft: "20px"}} onChange={(e)=> this.setState({entertime:e.target.value})}></input>
                        <Button className="btn btn-dark btn-lg btn-block" style={{marginLeft: "20px"}} onClick={this.enterTime.bind(this)}>Submit</Button>              
                    </div>
                    <br />
                    <div className="text-center font-weight-bold">
                        <Label className="font-weight-bold" style={{fontSize: "10px"},{fontWeight:"bolder"}}> Exit Time :  </Label>
                        <input type="time" id="exit" value={this.state.exittime} style={{marginLeft: "20px"}} onChange={(e)=> this.setState({exittime:e.target.value})}></input>
                        <Button className="btn btn-dark btn-lg btn-block" style={{marginLeft: "20px"}} onClick={this.exitTime.bind(this)}>Submit</Button>              
                    </div>
                        <Button className="btn btn-dark btn-lg btn-block" style={{marginLeft: "20px"}} onClick={()=> this.props.history.push(`/logout/${this.state.id}`)}>Logout</Button>              
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}