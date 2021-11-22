package com.shivam.Database.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity

public class Login {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long lid;
	@Column(name = "username")
	private String username;
	@Column(name = "password")
	private String password;
	public Login() {
		// TODO Auto-generated constructor stub
	}
	public Login(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	public long getLid() {
		return lid;
	}
	public void setLid(long lid) {
		this.lid = lid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
	
}
