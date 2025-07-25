package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.bean.CartItem;
import com.ecommerce.services.CartServices;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {
	@Autowired
	CartServices services;
	ObjectMapper objMapper = new ObjectMapper();
	JsonNode jsonNode;

	@GetMapping(value= "/getall")
	public List<CartItem> getAllCartItem(){
		return services.getAllCartItem();
	}
	
	
	@PostMapping(value = "/additem")
	public CartItem addItem(HttpSession session, @RequestBody String productId) {
		try {
			jsonNode = objMapper.readTree(productId);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		Integer pid = jsonNode.get("pid").asInt();
		CartItem item = new CartItem(1, (Integer)session.getAttribute("uid"), pid);
		return services.addProduct(item);
		
	}
	
	//updateQty===========================================================================
	@PostMapping(value = "/updateqty/{qty}/{id}")
	public void updateQty(@PathVariable("qty") Integer qty, @PathVariable("id") Integer id, HttpSession session) {
	    if(session != null) {
	    	services.updateQty(qty, id, (Integer) session.getAttribute("uid"));
	    }
	}
	
	//deleteItem==============================================================================
	@PostMapping(value = "/deletecartitem/{pid}")
	public void deleteCartItem(HttpSession session, @PathVariable("pid") Integer pid) {
		services.deleteCartItem((Integer) session.getAttribute("uid"), pid);
	}
	
	
	//getItems=================================================================================
	@GetMapping(value = "/getcartItembyid") 
	public List<CartItem> getCartItemUid( HttpSession session) {
	    return services.findByUid((Integer) session.getAttribute("uid"));
	}
	
	//isItemInCart=============================================================================
	@GetMapping(value = "/isitemincart/{pid}")
	public boolean isItemInCart(HttpSession session, @PathVariable("pid") Integer pid) {
		return services.isItemInCart((Integer)session.getAttribute("uid"), pid);
	}
	
	
	@GetMapping(value = "/getcount")
	public Long getCount(HttpSession session) {
		if (session != null)
			return services.getCount((Integer) session.getAttribute("uid"));
		return (long) 0;
	}
}
