package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.bean.Product;
import com.ecommerce.services.ProductServices;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
	@Autowired
	ProductServices productServices;
	
	@GetMapping(value= "/getall")
	public List<Product> getAllProducts(){
		return productServices.getAllProducts();
	}
	
	@GetMapping(value = "/getProductbyid/{id}")
	public Product getProduct(@PathVariable("id") Integer id) {
	    return productServices.getProduct(id);
	}

	@PostMapping(value = "/addproduct")
	public Integer addProduct(@RequestBody String product)
	{
		return productServices.addProduct(product);
	}
	
	@GetMapping(value = "/latest")
	public List<Product> getLatestProduct()
	{
		return productServices.getLatestProducts();
		
	}
	
	@GetMapping(value = "/popular")
	public List<Product> getPopularProduct()
	{
		return productServices.getPopularProducts();
		
	}
	@PostMapping("/removeProduct")
	public void removeProduct(@RequestBody String pid) {
		productServices.removeProduct(pid);
	}
	@PostMapping("/setpopular")
	public void setPopular(@RequestBody String pop) {
		productServices.setPopular(pop);
	}
	@PostMapping("/getproductbypage")
	public List<Product> getProductByPage(
	        @RequestParam("limit") Integer limit,
	        @RequestParam("offset") Integer offset,
	        @RequestParam(value = "filters", required = false) String filters // Make filters optional
	    ) {
	        
	        
		if (filters != null) {
			return productServices.getFilteredProductsByPage(limit, offset, filters);
        }

	        return productServices.getProductByPage(limit, offset);
	    }

}
