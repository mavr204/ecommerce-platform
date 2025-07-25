package com.ecommerce.services;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ecommerce.bean.WishlistItems;
import com.ecommerce.dao.WishlistRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class WishlistServices {
	@Autowired
	WishlistRepository repository;
	
	public List<WishlistItems> getAll(Integer uid){
		return repository.getAll(uid);
	}
	
	public void addItem(String pid, Integer uid) {
	    try {
	        ObjectMapper mapper = new ObjectMapper();
	        Map<String, Object> jsonMap = mapper.readValue(pid, new TypeReference<Map<String, Object>>() {});

	        Integer productId = (Integer) jsonMap.get("pid");
	        WishlistItems item = new WishlistItems(uid, productId);
	        repository.save(item);
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}
	
	public boolean itemExists(Integer uid, String pid) {
		try {
	        ObjectMapper mapper = new ObjectMapper();
	        Map<String, Object> jsonMap = mapper.readValue(pid, new TypeReference<Map<String, Object>>() {});

	        Integer productId = (Integer) jsonMap.get("pid");
	        
	        return repository.itemExists(uid, productId) > 0;
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
		return true;
	}
	
	public void removeItem(String pid, Integer uid) {
	    try {
	        ObjectMapper mapper = new ObjectMapper();
	        Map<String, Object> jsonMap = mapper.readValue(pid, new TypeReference<Map<String, Object>>() {});

	        Integer productId = (Integer) jsonMap.get("pid");
	        repository.removeItem(uid, productId);
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}
}
