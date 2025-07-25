package com.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.bean.WishlistId;
import com.ecommerce.bean.WishlistItems;

import jakarta.transaction.Transactional;

import java.util.List;

@Repository
//The @Repository annotation indicates that this interface is a Spring Data repository.
//It makes the interface eligible for Spring Data's repository infrastructure.
public interface WishlistRepository extends JpaRepository<WishlistItems, WishlistId> {

    @Query("SELECT w FROM WishlistItems w WHERE w.id.uid = :uid")
    List<WishlistItems> getAll(@Param("uid") Integer uid);
    @Query("SELECT COUNT(w) FROM WishlistItems w WHERE w.id.uid = :uid AND w.id.pid = :pid")
    Integer itemExists(@Param("uid") Integer uid, @Param("pid") Integer pid);
    @Modifying
    @Transactional
    @Query("DELETE FROM WishlistItems w WHERE w.id.uid = :uid AND w.id.pid = :pid")
    void removeItem(@Param("uid") Integer uid, @Param("pid") Integer pid);
}
