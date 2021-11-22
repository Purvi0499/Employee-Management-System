package com.shivam.Database.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shivam.Database.model.Employee;
import com.shivam.Database.model.Login;
@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long>{
	Employee findByEmailIdAndPassword(String emailId,String password);
	Employee findByEmailId(String emailId);
}
