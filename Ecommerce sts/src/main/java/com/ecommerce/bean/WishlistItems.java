package com.ecommerce.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "wishlist")
@IdClass(WishlistId.class) // Specify the composite primary key class
public class WishlistItems {
    @Id
    @Column(name = "uid")
    private Integer uid;

    @Id
    @Column(name = "pid")
    private Integer pid;
	@Override
	public String toString() {
		return "WishlistItems [uid=" + uid + ", pid=" + pid + "]";
	}
	public WishlistItems() {
		super();
		// TODO Auto-generated constructor stub
	}
	public WishlistItems(Integer uid, Integer pid) {
		super();
		this.uid = uid;
		this.pid = pid;
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
}
