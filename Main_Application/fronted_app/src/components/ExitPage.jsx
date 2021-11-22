import React from "react";

export class Exit extends React.Component{
    constructor(props){
        super(props)
        this.state={project:"",status:""}
    }

    projectSelect(event){
    this.setState({project:event.target.value})
    }
    
    statusSelect(event){
    this.setState({status:event.target.value})
    }

    exit(event){
        event.preventDefault();
        
        this.props.history.push("/")
    }
    render(){
        return (
            <div className="container">
                <div className="text-center">
                    <h2 className="text-center font-weight-bold">Select Project</h2>            
                    <select value={this.state.project} onChange={this.projectSelect.bind(this)}>
                        <option >AI</option>
                        <option >ML</option>
                        <option >SalesForce</option>
                        <option >Full Stack</option>
                    </select>
                </div>
                
                <div className="text-center">
                    <h2 className="text-center font-weight-bold">Select Status of Project</h2>            
                    <select value={this.state.status} onChange={this.statusSelect.bind(this)}>
                        <option >Not Started</option>
                        <option >Incomplete</option>
                        <option >Completed</option>
                    </select>
                </div>

                <div>
                    <button className="btn-lg btn-dark btn-block text-center" onClick={this.exit.bind(this)}>Logout</button>    
                </div>    
            </div>
        )
    }
}