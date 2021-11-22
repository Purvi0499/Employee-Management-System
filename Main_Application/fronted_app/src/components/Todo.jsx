import React from "react";

export class Todo extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }

    render(){
        return (
        <div className="container">
            <div className="text-center">
                <h2 className="text-center font-weight-bold">Select Manager</h2>            
                <br />
                <br />
                <select  >
                    <option >Shivam</option>
                    <option >Purvi</option>
                    <option >Saood</option>
                    <option >Hardik</option>
                </select>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="text-center">
                <h2 className="text-center font-weight-bold">Select Project</h2>            
                <select >
                    <option >AI</option>
                    <option >ML</option>
                    <option >SalesForce</option>
                    <option >Full Stack</option>
                </select>
            </div>
            <br />
            <br />
            {/* className="mt-3 mb-3" */}
            <div className="text-center">
                <button className="btn-lg btn-dark btn-block text-center">Submit</button>
                <span className="p-4">|</span>
                 <a href="/exit">Exit Page</a>
            </div>
        </div>
        )
}
}