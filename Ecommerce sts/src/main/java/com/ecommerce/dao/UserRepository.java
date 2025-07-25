package com.ecommerce.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.bean.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	@Query("SELECT u FROM User u WHERE u.email = :email AND u.pwd = :pwd")
	public User authUser(@Param("email") String email, @Param("pwd") String pwd);
	@Query("SELECT count(u) FROM User u WHERE u.email = :email")
	public Integer userExists(@Param("email") String email);
	@Query("SELECT count(u) FROM User u WHERE u.pNum = :pnum")
	public Integer phoneExists(@Param("pnum") Long pnum);
	@Query("SELECT count(u) FROM User u WHERE u.uid = :uid AND u.pwd = :pwd")
	public Integer authUserPassword(@Param("uid") Integer uid, @Param("pwd") String pwd);
	@Modifying
    @Transactional
    @Query("UPDATE User u SET u.pNum = :pnum, u.address = :address, u.name = :name, u.email = :email WHERE u.uid = :uid")
    void updateUserDetails(
            @Param("uid") Integer uid, 
            @Param("pnum") Long pnum, 
            @Param("address") String address,
            @Param("name") String name,
            @Param("email") String email);
	@Modifying
    @Transactional
    @Query("UPDATE User u SET u.pwd = :pwd WHERE u.uid = :uid")
    void updateUserPassword(
            @Param("uid") Integer uid, 
            @Param("pwd") String pwd);
	
	@Query("SELECT COUNT(u) from User u WHERE u.uid = :uid AND u.isAdmin = :adminStatus")
	public Integer isAdmin(@Param("uid") Integer uid, @Param("adminStatus") Boolean adminStatus);
	
	@Query("SELECT COUNT(u) from User u WHERE u.email = :email AND u.isAdmin = :adminStatus")
	public Integer isAdminById(@Param("email") String uid, @Param("adminStatus") Boolean adminStatus);
	
    @Query("SELECT u FROM User u")
    List<User> findAllUsers();
    
    @Transactional
    @Modifying
    @Query("DELETE FROM User u WHERE u.uid = :uid")
    public void removeUser(@Param("uid") String uid);
    
    @Query("SELECT u.address FROM User u WHERE u.uid = :uid") 
    public String getAddress(@Param("uid") Integer uid);

}

