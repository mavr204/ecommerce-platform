package com.ecommerce.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;


@Entity
@Table(name = "productDetails")
public class ProductDetails {
	@Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name="pid")
	private Integer pid;
	@Column(name="specTitle")
	private String specTitle;
	@Column(name="specValue")
	private String specValue;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getPid() {
		return pid;
	}
	public void setPid(Integer pid) {
		this.pid = pid;
	}
	public String getSpecTitle() {
		return specTitle;
	}
	public void setSpecTitle(String specTitle) {
		this.specTitle = specTitle;
	}
	public String getSpecValue() {
		return specValue;
	}
	public void setSpecValue(String specValue) {
		this.specValue = specValue;
	}
	public ProductDetails(Integer id, Integer pid, String specTitle, String specValue) {
		super();
		this.id = id;
		this.pid = pid;
		this.specTitle = specTitle;
		this.specValue = specValue;
	}
	public ProductDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "ProductDetails [id=" + id + ", pid=" + pid + ", specTitle=" + specTitle + ", specValue=" + specValue
				+ "]";
	}
	
	
}
