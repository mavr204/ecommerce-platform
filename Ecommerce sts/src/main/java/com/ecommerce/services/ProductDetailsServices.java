package com.ecommerce.services;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.bean.ProductDetails;
import com.ecommerce.dao.ProductDetailsRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ProductDetailsServices {
    @Autowired
    private ProductDetailsRepository productDetailsRepository;

    private ObjectMapper objectMapper = new ObjectMapper();

    public List<ProductDetails> getAllProductDetails() {
        return productDetailsRepository.findAll();
    }

    public ProductDetails addProductDetails(ProductDetails productDetails) {
        return productDetailsRepository.save(productDetails);
    }

    public String getProductDetailsAsJson(Integer pid) {
        List<Map<String, String>> resultList = productDetailsRepository.getProductDetails(pid);
        try {
            return objectMapper.writeValueAsString(convertToJsonObject(resultList));
        } catch (JsonProcessingException e) {
            // Handle JSON serialization exception
            e.printStackTrace();
            return null;
        }
    }

    private Map<String, String> convertToJsonObject(List<Map<String, String>> resultList) {
        Map<String, String> jsonObject = new LinkedHashMap<>();
        for (Map<String, String> entry : resultList) {
            jsonObject.put(entry.get("specTitle"), entry.get("specValue"));
        }
        return jsonObject;
    }
}
