package com.ecommerce.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ecommerce.bean.CartItem;
import com.ecommerce.dao.CartRepository;

@Service
public class CartServices {
	@Autowired
	private CartRepository repository;
	
	public List<CartItem> getAllCartItem() {
        return repository.findAll();
    }
	
	public CartItem getCartItem(Integer pid, Integer uid) {
        return repository.findById(pid, uid);
    }
	public Long getCount(Integer uid) {
		return repository.getCountByUid(uid);
		
	}
	public List<CartItem> findByUid( Integer uid){
 
		return repository.findByUid(uid);
	}
	public CartItem addProduct(CartItem cartItem) {
        return repository.save(cartItem);
    }
	public void updateQty(Integer qty, Integer pid, Integer uid) {
		repository.updateQty(qty, pid, uid);
	}
	public void deleteCartItem(Integer uid, Integer pid) {
		repository.deleteCartItem(uid, pid);
	}
	public boolean isItemInCart(Integer uid, Integer pid) {
		return repository.isItemInCart(uid, pid) == null ? false : true;
	}
}
