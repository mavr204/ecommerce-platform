package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.bean.Orders;
import com.ecommerce.services.OrdersServices;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrdersController {
	@Autowired
	OrdersServices services;

	@GetMapping("/getorders")
	public List<Orders> getOrders(HttpSession session){
		return services.getOrders((Integer)session.getAttribute("uid"));
		
	}
	@PostMapping("/getorderbyid")
	public Orders getOrderById(@RequestBody String id) {
		
		return services.getOrderById(id);
	}
	
	@GetMapping("/orderexists")
	public boolean ororderExists(HttpSession session) {
		return services.orderExists((Integer)session.getAttribute("uid"));
	}
	
	@PostMapping("/orderexistsbyid")
	public boolean orderexistsbyid(HttpSession session,  @RequestBody String id) {
		if(session != null) {
			return services.orderExistsById(id);
		}
		return false;
	}
    @GetMapping("/all")
    public List<Orders> getAllOrders() {
        return services.getAllOrders();
    }
    
    @PostMapping("/removeOrder")
    public void removeOrder(@RequestBody String orderId) {
        services.removeOrder(orderId);
    }
    
    @PostMapping("/updatestatus")
    public void updateOrderStatus(@RequestBody String orderDetails) {
        services.updateStatus(orderDetails);
    }
    @PostMapping("/addorder")
    public String addOrder(HttpSession session, @RequestParam("pid") Integer pid, @RequestParam("transactionId") String transactionId) {
        return services.addOrder(pid, (Integer)session.getAttribute("uid"), transactionId);
    }
}
