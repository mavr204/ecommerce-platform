package com.ecommerce.bean;

import jakarta.persistence.*;

@Entity
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pid")
	private Integer id;

	@Column(name = "title")
	private String title;

	@Column(name = "price")
	private Double price;

	@Column(name = "discount_price")
	private Double discountedPrice;
	
	@Column(name = "popular", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean popular;
	
	@Column(name = "category", nullable= false)
    private String category;

	public Product(Integer id, String title, Double price, Double discountedPrice, boolean popular,
			String category) {
		super();
		this.id = id;
		this.title = title;
		this.price = price;
		this.discountedPrice = discountedPrice;
		this.popular = popular;
		this.category = category;
	}

	public boolean isPopular() {
		return popular;
	}

	public void setPopular(boolean popular) {
		this.popular = popular;
	}

	public Integer getId() {
	    return id;
	}

	public void setId(Integer id) {
	    this.id = id;
	}

	public String getTitle() {
	    return title;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public void setTitle(String title) {
	    this.title = title;
	}

	public Double getPrice() {
	    return price;
	}

	public void setPrice(Double price) {
	    this.price = price;
	}

	public Double getDiscountedPrice() {
	    return discountedPrice;
	}

	public void setDiscountedPrice(Double discountedPrice) {
	    this.discountedPrice = discountedPrice;
	}

	public Product() { 
	    // Default constructor required by JPA
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", title=" + title + ", price=" + price + ", discountedPrice=" + discountedPrice
				+ ", popular=" + popular + ", category=" + category + "]";
	}






}
