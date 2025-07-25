package com.ecommerce.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.bean.Orders;

import jakarta.transaction.Transactional;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, String>{
	@Query("SELECT o FROM Orders o WHERE o.uid = :uid ORDER BY o.orderDate DESC")
	List<Orders>getOrders(@Param(value = "uid") Integer uid);
	@Query("SELECT COUNT(o) FROM Orders o WHERE o.uid = :uid")
	Integer getOrderCount(@Param(value = "uid") Integer uid);
	@Query("SELECT COUNT(o) FROM Orders o WHERE o.orderId = :orderId")
	Integer getOrderCountById( @Param(value = "orderId") String orderId);
	
	@Query("SELECT o FROM Orders o")
    List<Orders> findAllOrders();
	
    @Transactional
    @Modifying
    @Query("DELETE FROM Orders o WHERE o.orderId = :orderId")
    public void removeOrder(@Param("orderId") String orderId);
    
    @Transactional
    @Modifying
    @Query("UPDATE Orders o SET o.orderStatus = :orderStatus WHERE o.orderId = :orderId")
    void updateStatus(@Param("orderId") String orderId, @Param("orderStatus") String orderStatus);
}
