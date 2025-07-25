package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.bean.User;
import com.ecommerce.services.EmailRequest;
import com.ecommerce.services.PhoneRequest;
import com.ecommerce.services.UserServices;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	@Autowired
	UserServices services;
	
	@GetMapping(value= "/all")
	public List<User> getAllUsers(){
		return services.getAllUsers();
	}
	
	@GetMapping(value="/getbyid")
	public User getUser(HttpSession session) {
		if(session != null)
			return services.getUser((Integer)session.getAttribute("uid"));
		return null;
	}
	
	@PostMapping(value="/authuser")
	public boolean authUser(@RequestBody String credentials, HttpSession session) {
		User user = services.authUser(credentials);
		if(user != null) {
			session.setAttribute("uid", user.getUid());
		}
		return user != null; 
	}
	
	@PostMapping(value="/adduser")
	public void addUser(@RequestBody String newUser) {
		services.addUser(newUser);
	}
	
	@PostMapping(value="/updateuserdetails")
	public void updateUserDetails(HttpSession session, @RequestBody String newUser) {
		services.updateUserDetails((Integer)session.getAttribute("uid"), newUser);
	}
	
	@PostMapping(value="/updateuserpassword")
	public void updateUserPassword(HttpSession session, @RequestBody String password) {
		services.updateUserPassword((Integer)session.getAttribute("uid"), password);
	}
	
	@GetMapping(value="/logout")
	public void logout(HttpSession session) {
		session.invalidate();
	}
	
	@GetMapping(value="/logincheck")
	public boolean loginCheck(HttpSession session) {
		if (session.getAttribute("uid") != null) {
			return true;
		}
		return false;
	}
	
	@PostMapping(value="/userexists")
	public boolean userExists(@RequestBody EmailRequest request) {
		return services.userExists(request.getEmail());
	}
	
	@PostMapping(value="/phoneexists")
	public boolean phoneExists(@RequestBody PhoneRequest request) {
		return services.phoneExists(Long.parseLong(request.getPhone()));
	}
	
	@PostMapping(value="/authuserpassword")
	public boolean authUserPassword(HttpSession session, @RequestBody String pwd) {
		return services.authUserPassword((Integer)session.getAttribute("uid"), pwd);
	}
	@GetMapping(value="/isadmin")
	public boolean isAdmin(HttpSession session){
		if(session != null)
			return services.isAdmin((Integer)session.getAttribute("uid"));
		return false;
	}
	@PostMapping(value="/isadminbyuid")
	public boolean isAdmin(@RequestBody String uid){
		
			return services.isAdmin(uid);
	}
	@PostMapping("/removeuser")
	public void removeUser(@RequestBody String uid) {
		services.removeUser(uid);
	}
}
