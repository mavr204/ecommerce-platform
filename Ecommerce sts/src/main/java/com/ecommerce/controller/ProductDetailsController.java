package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.bean.ProductDetails;
import com.ecommerce.services.ProductDetailsServices;

@RestController
@RequestMapping("/productDetails")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductDetailsController {
	@Autowired
	ProductDetailsServices productDetailsServices;
	
	@GetMapping(value= "/getall")
	public List<ProductDetails> getAllProductDetails(){
		return productDetailsServices.getAllProductDetails();
	}
	
	@GetMapping(value = "/getproductdetailsbyid/{pid}")
	public String getProductDetails(@PathVariable("pid") Integer pid) {
	    return productDetailsServices.getProductDetailsAsJson(pid);
	}
	
	@PostMapping(value = "/addproductdetails")
	public ProductDetails addProductDetails(@RequestBody ProductDetails productDetails)
	{
		return productDetailsServices.addProductDetails(productDetails);		
	}
	
}
