import React from 'react';
import logo from './logo.svg';
import './App.css';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
// import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import { Login } from './components/EmployeeLogin';
import {SignUp} from './components/Registration';
import { Todo } from './components/Todo';
import { Exit } from './components/ExitPage';
import { Home } from './components/HomeComponent';
import { EmployeeHome } from './components/EmployeeHome';
import { Logout } from './components/logout';
import { Forget } from './components/ForgetPassword';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          {/* <Route path = "/" exact component = {Login}></Route> */}
                          <Route path = "/" exact component = {Home}></Route>
                          <Route path = "/login/:id"  component = {Login}></Route>
                          <Route path = "/empHome/:id"  component = {EmployeeHome}></Route>
                          <Route path = "/logout/:id"  component = {Logout}></Route>
                          <Route path = "/forget_password/:id"  component = {Forget}></Route>

                          <Route path = "/exit" exact component = {Exit}></Route>
                          <Route path = "/signUp"  component = {SignUp}></Route>
                          {/* <Route path = "/employees" component = {()=><ListEmployeeComponent authorized={true}/>}></Route> */}
                          <Route path = "/employees" component = {ListEmployeeComponent}></Route>
                          <Route path = "/add-employee/:id" component = {CreateEmployeeComponent}></Route>
                          <Route path = "/view-employee/:id" component = {ViewEmployeeComponent}></Route>
                          {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
