package com.ecommerce.bean;
	import java.io.Serializable;
import java.util.Objects;

	public class WishlistId implements Serializable {
		private static final long serialVersionUID = 1L;
	    private Integer uid;
	    private Integer pid;

	    public WishlistId() {
	        // Default constructor
	    }

	    public WishlistId(Integer uid, Integer pid) {
	        this.uid = uid;
	        this.pid = pid;
	    }

	    // Getters and setters
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

	    // Equals and hashCode methods
	    @Override
	    public boolean equals(Object o) {
	        if (this == o) return true;
	        if (!(o instanceof WishlistId)) return false;
	        WishlistId that = (WishlistId) o;
	        return getUid().equals(that.getUid()) && getPid().equals(that.getPid());
	    }

	    @Override
	    public int hashCode() {
	        return Objects.hash(getUid(), getPid());
	    }
	}

