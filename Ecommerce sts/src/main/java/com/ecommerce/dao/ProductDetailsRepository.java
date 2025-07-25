package com.ecommerce.dao;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.bean.ProductDetails;

@Repository
public interface ProductDetailsRepository extends JpaRepository<ProductDetails, Integer>{
	@Query(value = "SELECT pd.spec_title as specTitle, pd.spec_value as specValue FROM product_details pd WHERE pd.pid = :pid", nativeQuery = true)
    List<Map<String, String>> getProductDetails(@Param("pid") Integer pid);
}
