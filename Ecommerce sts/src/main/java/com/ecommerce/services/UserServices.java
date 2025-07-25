package com.ecommerce.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ecommerce.bean.User;
import com.ecommerce.dao.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class UserServices {
	@Autowired
	UserRepository repository;
	ObjectMapper objMapper = new ObjectMapper();
	JsonNode jsonNode;
	
	public List<User> getAll() {
        return repository.findAll();
    }
	
	public User getUser(Integer uid) {
		User user = repository.findById(uid).orElse(null);
		user.setPwd("");
		user.setUid(null);
		return user;
	}
	
	public User authUser(String credentials) {
		try {
			jsonNode = objMapper.readTree(credentials);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		String email = jsonNode.get("email").asText();
        String pwd = jsonNode.get("pwd").asText();
		return repository.authUser(email, HashFunction.getSHA256Hash(pwd));
	}
	
	public void addUser(String newUser) {
		try {
			jsonNode = objMapper.readTree(newUser);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		String name = jsonNode.get("firstName").asText() + " " + jsonNode.get("lastName").asText();
		
		Long pnum = jsonNode.get("phone").asLong();
		
		String address = jsonNode.get("houseNumber").asText() + ", " + 
		jsonNode.get("landmark").asText() + ", " +
		jsonNode.get("street").asText() + ", " + 
		jsonNode.get("city").asText() + " (" +
		jsonNode.get("pin").asText() + "), "+ 
		jsonNode.get("state").asText();
		
		String email = jsonNode.get("email").asText();
        String pwd = jsonNode.get("password").asText();
        User user = new User();
        user.setPwd(HashFunction.getSHA256Hash(pwd));
        user.setName(name);
        user.setEmail(email);
        user.setpNum(pnum);
        user.setAddress(address);
        
		repository.save(user);
	}
	
	public void updateUserDetails(Integer uid, String newUser) {
		try {
			jsonNode = objMapper.readTree(newUser);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		String name = jsonNode.get("firstName").asText() + " " + jsonNode.get("lastName").asText();
		
		Long pnum = jsonNode.get("phone").asLong();
		
		String address = jsonNode.get("houseNumber").asText() + ", " + 
		jsonNode.get("landmark").asText() + ", " +
		jsonNode.get("street").asText() + ", " + 
		jsonNode.get("city").asText() + " (" +
		jsonNode.get("pin").asText() + "), "+ 
		jsonNode.get("state").asText();
		
		String email = jsonNode.get("email").asText();
               
        repository.updateUserDetails(uid, pnum, address, name, email);
	}
	
	public void updateUserPassword(Integer uid, String password) {
		try {
			jsonNode = objMapper.readTree(password);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
        String pwd = jsonNode.get("pwd").asText();
        System.out.println(pwd);
        System.out.println(HashFunction.getSHA256Hash(pwd));
        repository.updateUserPassword(uid, HashFunction.getSHA256Hash(pwd));
	}
	
	public void deleteUser(Integer uid) {
		repository.deleteById(uid);
	}
	
	public boolean userExists(String email) {
		return repository.userExists(email) > 0;
	}
	
	public boolean phoneExists(Long phone) {
		return repository.phoneExists(phone) > 0;
	}
	
	public boolean authUserPassword(Integer uid, String password) {
		try {
			jsonNode = objMapper.readTree(password);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
        String pwd = jsonNode.get("pwd").asText();
        System.out.println(pwd);
        System.out.println(HashFunction.getSHA256Hash(pwd));
		return repository.authUserPassword(uid, HashFunction.getSHA256Hash(pwd)) > 0;
	}

	public boolean isAdmin(Integer uid){
		return repository.isAdmin(uid, true) > 0;
	}
	public boolean isAdmin(String userId){
		try {
			jsonNode = objMapper.readTree(userId);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
        String uid = jsonNode.get("email").asText();
		return repository.isAdminById(uid, true) > 0;
	}
	
//	added by jeet
	public List<User> getAllUsers() {
		List<User> user = repository.findAllUsers();
		for (int i = 0; i < user.size(); i++) {
			user.get(i).setPwd("");
			if(user.get(i).getIsAdmin()) {
				user.get(i).setUid(null);
			}
		}
        return user;
    }
	
	public void removeUser(String id) {
        try {
            jsonNode = objMapper.readTree(id);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        String uid = jsonNode.get("uid").asText();
        repository.removeUser(uid);
    }
}
