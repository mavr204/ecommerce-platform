package com.ecommerce.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecommerce.bean.Product;
import com.ecommerce.dao.ProductRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ProductServices {
    @Autowired
    private ProductRepository productRepository;
	ObjectMapper objMapper = new ObjectMapper();
	JsonNode jsonNode;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Integer addProduct(String productData) {
    	try {
			jsonNode = objMapper.readTree(productData);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
    	String title = jsonNode.get("title").asText();
    	Double price = jsonNode.get("price").asDouble();
    	Double discountPrice = jsonNode.get("discountPrice").asDouble();
    	String category = jsonNode.get("category").asText();
    	Product product = new Product();
    	product.setTitle(title);
    	product.setCategory(category);
    	product.setDiscountedPrice(discountPrice);
    	product.setPopular(false);
    	product.setPrice(price);
        productRepository.save(product);
        return product.getId();
    }

    public Product getProduct(Integer pid) {
        return productRepository.findById(pid).orElse(null);
    }

    public List<Product> getLatestProducts() {
        Pageable pageable = PageRequest.of(0, 4);
        return productRepository.findTop4ByIdDesc(pageable);
    }

    public List<Product> getPopularProducts() {
        Pageable pageable = PageRequest.of(0, 6);
        return productRepository.findPopularProducts(pageable);
    }

    public void removeProduct(String id) {
    	try {
			jsonNode = objMapper.readTree(id);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
    	Integer pid = jsonNode.get("pid").asInt();
    	productRepository.removeProduct(pid);
    }
    public void setPopular(String id) {
    	try {
			jsonNode = objMapper.readTree(id);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
    	Integer pid = jsonNode.get("pid").asInt();
    	Boolean popular = jsonNode.get("popular").asBoolean();
    	productRepository.updatePopular(pid, popular);
    }
    public List<Product> getProductByPage(Integer limit, Integer offset){
    	Pageable pageable = PageRequest.of(offset, limit);
    	return Math.ceil(((double)getCount())/((double)limit)) >= offset ? productRepository.getProductByPage(pageable)  : null;
    }
    public Long getCount() {
    	return productRepository.count();
    }
    public List<Product> getFilteredProductsByPage(Integer limit, Integer offset, String filter){
    	List<Product> products = new ArrayList<>();
    	try {
    		Pageable pageable = PageRequest.of(offset, limit);
    		List<String> filters = objMapper.readValue(filter, new TypeReference<List<String>>() {});
    		products = productRepository.getFilteredProducts(pageable, filters);
			System.out.println(filters);
			System.out.println(products);
			return products;

    	}catch (Exception e) {
            // Handle parsing exceptions
            e.printStackTrace();
        }
    	return products;
    }

}
