package com.ecommerce.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.bean.CartItem;
import com.ecommerce.bean.WishlistId;

import jakarta.transaction.Transactional;

@Repository
public interface CartRepository extends JpaRepository<CartItem, WishlistId>{


    @Query("SELECT c FROM CartItem c WHERE c.id.pid = :pid AND c.id.uid = :uid")
    CartItem findById(@Param("pid") Integer pid, @Param("uid") Integer uid);

    @Query("SELECT c FROM CartItem c WHERE c.id.uid = :uid")
    List<CartItem> findByUid(@Param("uid") Integer uid);

    @Modifying
    @Transactional
    @Query("UPDATE CartItem c SET c.qty = :qty WHERE c.id.pid = :pid AND c.id.uid = :uid")
    void updateQty(@Param("qty") Integer qty, @Param("pid") Integer pid, @Param("uid") Integer uid);

    @Query("SELECT COUNT(c) FROM CartItem c WHERE c.id.uid = :uid")
    Long getCountByUid(@Param("uid") Integer uid);

    @Transactional
    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.id.pid = :pid AND c.id.uid = :uid")
    void deleteCartItem(@Param("uid") Integer uid, @Param("pid") Integer pid);

    @Query("SELECT c FROM CartItem c WHERE c.id.pid = :pid AND c.id.uid = :uid")
    CartItem isItemInCart(@Param("uid") Integer uid, @Param("pid") Integer pid);
}
