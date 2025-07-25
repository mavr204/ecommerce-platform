package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.bean.WishlistItems;
import com.ecommerce.services.WishlistServices;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin(origins = "http://localhost:5173")
public class WishlistController {
	@Autowired
	WishlistServices services;
	
	@GetMapping("/getall")
	public List<WishlistItems> getAll(HttpSession session){
		if(session != null)
			return services.getAll((Integer)session.getAttribute("uid"));
		else return null;
	}
	@PostMapping("/additem")
	public void addItem(HttpSession session, @RequestBody String pid) {
		if(session != null || true) {
			services.addItem(pid, (Integer)session.getAttribute("uid"));
		}
	}
	@PostMapping("/itemexists")
	public boolean itemExists(HttpSession session, @RequestBody String pid) {
		if(session != null) {
			return services.itemExists((Integer)session.getAttribute("uid"), pid);
		} else return true;
	}
	@PostMapping("/removeitem")
	public void removeItem(HttpSession session, @RequestBody String pid) {
		if(session != null) {
			services.removeItem(pid, (Integer)session.getAttribute("uid"));
		} 
	}
	
}
