import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employees";
const REGISTER_EMPLOYEE_API_BASE_URL = "http://localhost:8080/signUp";
const LOGIN_MANAGER_API_BASE_URL = "http://localhost:8080/logins";    
const LOGIN_EMPLOYEE_API_BASE_URL = "http://localhost:8080/emplogins";    

class EmployeeService {

    managerLogin(login){
        return axios.post(LOGIN_MANAGER_API_BASE_URL,login)
    }

    getLogin(login){
        return axios.post(LOGIN_EMPLOYEE_API_BASE_URL,login)
    }
    createLogin(login){
        return axios.post(REGISTER_EMPLOYEE_API_BASE_URL,login)
    }

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }
    
    updateStatus(employee, employeeId){
        return axios.put("http://localhost:8080/statusChange/" + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    resetManager(password,login){
        return axios.post("http://localhost:8080/managerforgets" + '/' + password,login)
    }
    
    resetEmployee(password,login){
        return axios.post("http://localhost:8080/employeeforgets" + '/' + password,login)
    }

    enterTime(id,employee){
        return axios.put("http://localhost:8080/enterTime/" + id,employee)
    }

    exitTime(id,employee){
        return axios.put("http://localhost:8080/exitTime/"+id,employee)
    }

}

export default new EmployeeService()