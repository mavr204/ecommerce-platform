package com.ecommerce.dao;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.bean.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{
	@Query("SELECT p FROM Product p ORDER BY p.id DESC")
	List<Product> findTop4ByIdDesc(Pageable pageable);
	@Query("SELECT p FROM Product p WHERE p.popular = true ORDER BY p.id DESC")
	List<Product> findPopularProducts(Pageable pageable);
	@Transactional
	@Modifying
	@Query("DELETE FROM Product p WHERE p.id = :pid")
	public void removeProduct(@Param("pid") Integer pid);
	@Transactional
	@Modifying
	@Query("UPDATE Product p SET p.popular = :popular WHERE p.id = :pid")
	void updatePopular(@Param("pid") Integer pid, @Param("popular") Boolean popular);
	@Query("SELECT p FROM Product p")
	List<Product>getProductByPage(Pageable pageable);
    @Query("SELECT p FROM Product p WHERE p.category IN :filters")
    List<Product> getFilteredProducts(Pageable pageable, @Param("filters") List<String> filters);


}
