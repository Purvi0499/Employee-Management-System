package com.shivam.Database.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shivam.Database.exception.ResourceNotFoundException;
import com.shivam.Database.model.Employee;
import com.shivam.Database.model.Login;
import com.shivam.Database.repo.EmployeeRepo;
import com.shivam.Database.repo.LoginRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class EmployeeController {
	
	@Autowired
	private EmployeeRepo employeeRepository;
	@Autowired
	private LoginRepo loginrepo;
	
	@GetMapping("/employees")
	public List<Employee> getAllEmployee(){
		return employeeRepository.findAll();
	}
	
	@GetMapping("/logins")
	public List<Login> getAllLogin(){
		return loginrepo.findAll();
	}
	
//	@PostMapping("/signUp")
//	public Login createLogin(@RequestBody Login login) {
//		return loginrepo.save(login);
//	}
	
	@PostMapping("/emplogins")
	public Long emplogin(@RequestBody Employee employee) {
		Employee oathuser= employeeRepository.findByEmailIdAndPassword(employee.getEmailId(), employee.getPassword());
//		Login oathuser=loginrepo.findByUsernameAndPassword(login.getUsername(), login.getPassword());
		if(Objects.nonNull(oathuser)) {
			return oathuser.getId();
		}
		else {
			return 0L;
		}
	}
	
	
	@PostMapping("/logins")
	public String login(@RequestBody Login login) {
//		 loginrepo.findByUsernameAndPassword(login.getUsername(), login.getPassword());
		Login oathuser=loginrepo.findByUsernameAndPassword(login.getUsername(), login.getPassword());
		if(Objects.nonNull(oathuser)) {
			return "redirect:/employees";
		}
		else {
			return "redirect:/";
		}
	}
	
	@PostMapping("/managerforgets/{password}")
	public String forgetManager(@PathVariable String password,@RequestBody Login login) {
		Login oathuser=loginrepo.findByUsername(login.getUsername());
		if(Objects.nonNull(oathuser)) {
			oathuser.setPassword(password);
			loginrepo.save(oathuser);
			return "Success";
		}
		else {
			return "failure";
		}
	}
	
	@PostMapping("/employeeforgets/{password}")
	public String forgetEmployee(@PathVariable String password,@RequestBody Employee employee) {
		Employee oathuser=employeeRepository.findByEmailId(employee.getEmailId());
		if(Objects.nonNull(oathuser)) {
			oathuser.setPassword(password);
			employeeRepository.save(oathuser);
			return "Success";
		}
		else {
			return "failure";
		}
	}
	

	// create employee rest api
		@PostMapping("/employees")
		public Employee createEmployee(@RequestBody Employee employee) {
			return employeeRepository.save(employee);
		}
		
		// get employee by id rest api
		@GetMapping("/employees/{id}")
		public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
			Employee employee = employeeRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
			return ResponseEntity.ok(employee);
		}
		
		// update employee rest api
		
		@PutMapping("/employees/{id}")
		public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails){
			Employee employee = employeeRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
			
			employee.setFirstName(employeeDetails.getFirstName());
			employee.setLastName(employeeDetails.getLastName());
			employee.setEmailId(employeeDetails.getEmailId());
			employee.setPassword(employeeDetails.getPassword());
			employee.setProject(employeeDetails.getProject());
			employee.setProjectStatus(employeeDetails.getProjectStatus());
			
			Employee updatedEmployee = employeeRepository.save(employee);
			return ResponseEntity.ok(updatedEmployee);
		}
		
		@PutMapping("/enterTime/{id}")
		public ResponseEntity<Employee> enterTime(@PathVariable Long id, @RequestBody Employee employeeDetails){
			Employee employee = employeeRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
			
			employee.setEnterTime(employeeDetails.getEnterTime());
			
			Employee updatedEmployee = employeeRepository.save(employee);
			return ResponseEntity.ok(updatedEmployee);
		}
		
		@PutMapping("/exitTime/{id}")
		public ResponseEntity<Employee> exitTime(@PathVariable Long id, @RequestBody Employee employeeDetails){
			Employee employee = employeeRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
			
			employee.setExitingTime(employeeDetails.getExitingTime());
			
			Employee updatedEmployee = employeeRepository.save(employee);
			return ResponseEntity.ok(updatedEmployee);
		}
		
		@PutMapping("/statusChange/{id}")
		public ResponseEntity<Employee> updateStatus(@PathVariable Long id, @RequestBody Employee employeeDetails){
			Employee employee = employeeRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
			
//			employee.setFirstName(employeeDetails.getFirstName());
//			employee.setLastName(employeeDetails.getLastName());
//			employee.setEmailId(employeeDetails.getEmailId());
//			employee.setPassword(employeeDetails.getPassword());
//			employee.setProject(employeeDetails.getProject());
			employee.setProjectStatus(employeeDetails.getProjectStatus());
			
			Employee updatedEmployee = employeeRepository.save(employee);
			return ResponseEntity.ok(updatedEmployee);
		}
		
		
		
		// delete employee rest api
		@DeleteMapping("/employees/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
			Employee employee = employeeRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
			
			employeeRepository.delete(employee);
			Map<String, Boolean> response = new HashMap<>();
			response.put("deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
		}
}
