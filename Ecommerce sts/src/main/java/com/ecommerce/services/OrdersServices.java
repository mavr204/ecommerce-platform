package com.ecommerce.services;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.bean.Orders;
import com.ecommerce.dao.OrdersRepository;
import com.ecommerce.dao.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class OrdersServices {
	
	@Autowired
	OrdersRepository repository;
	@Autowired
	UserRepository userRepository;
	ObjectMapper objMapper = new ObjectMapper();
	JsonNode jsonNode;
	
	public List<Orders> getOrders(Integer uid){
		return repository.getOrders(uid);
		
	}
	public Orders getOrderById(String id) {
		try {
			jsonNode = objMapper.readTree(id);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		String orderId = jsonNode.get("orderId").asText();
        return repository.findById(orderId).orElse(null);
	}
	public boolean orderExists(Integer uid) {
		return repository.getOrderCount(uid) > 0;
	}
	
	public boolean orderExistsById(String id) {
		try {
			jsonNode = objMapper.readTree(id);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		String orderId = jsonNode.get("pid").asText();
		return repository.getOrderCountById(orderId) > 0;
	}
	
    public List<Orders> getAllOrders() {
        return repository.findAllOrders();
    }
    
    public void removeOrder(String id) {
        try {
            jsonNode = objMapper.readTree(id);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        String orderId = jsonNode.get("orderId").asText();
        repository.removeOrder(orderId);
    }	
    
    public void updateStatus(String id) {
        try {
            jsonNode = objMapper.readTree(id);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        String orderId = jsonNode.get("orderId").asText();
        String orderStatus = jsonNode.get("orderStatus").asText();
        repository.updateStatus(orderId, orderStatus);
    }
    
    public String addOrder(Integer pid, Integer uid, String transactionId) {
    	LocalDate localDate = LocalDate.now();
        LocalDate deliveryDate = localDate.plusDays(5);
        Date sqlDeliveryDate = Date.valueOf(deliveryDate);
    	Date sqlDate = Date.valueOf(localDate);
    	String orderId = orderIdGenerator(uid, pid);
    	Orders order = new Orders();
    	order.setAddress(userRepository.getAddress(uid));
    	order.setUid(uid);
    	order.setPid(pid);
    	order.setOrderStatus("pending");
    	order.setOrderDate(sqlDate);
    	order.setDeliveryDate(sqlDeliveryDate);
    	order.setOrderId(orderId);
    	order.setTransactionId(transactionId);
    	repository.save(order);
    	return orderId;
    }
    private String orderIdGenerator(Integer uid, Integer pid) {
        Instant timestamp = Instant.now();

        String timeStampString = timestamp.toString()
                                        .replace("-", "")
                                        .replace(".", "")
                                        .replace(":", "");

    	String id = "ORD" + timeStampString + "00" + uid+ "0" + pid;
    	return id;
    }
}
