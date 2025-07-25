package com.ecommerce.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;

@Entity
@IdClass(WishlistId.class) 
public class CartItem {
	@Column(name="qty")
	private Integer qty;
	@Id
	@Column(name="uid")
	private Integer uid;
	@Id
	@Column(name="pid")
	private Integer pid;
	public Integer getQty() {
		return qty;
	}
	public void setQty(Integer qty) {
		this.qty = qty;
	}
	public Integer getUid() {
		return uid;
	}
	public void setUid(Integer uid) {
		this.uid = uid;
	}
	public Integer getPid() {
		return pid;
	}
	public void setPid(Integer pid) {
		this.pid = pid;
	}
	public CartItem(Integer qty, Integer uid, Integer pid) {
		super();
		this.qty = qty;
		this.uid = uid;
		this.pid = pid;
	}
	public CartItem() {
		super();
	}
	@Override
	public String toString() {
		return "CartItem [qty=" + qty + ", uid=" + uid + ", pid=" + pid + "]";
	}
}
