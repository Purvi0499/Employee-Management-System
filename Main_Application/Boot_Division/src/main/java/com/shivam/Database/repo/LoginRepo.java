package com.shivam.Database.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shivam.Database.model.Login;

public interface LoginRepo extends JpaRepository<Login, Long>{
	Login findByUsernameAndPassword(String username,String password);
	Login findByUsername(String username);
}
