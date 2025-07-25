package com.ecommerce.bean;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid")
    private Integer uid;

    @Column(name = "pwd", nullable = false)
    private String pwd;

    @Column(name = "pnum", unique = true, nullable = false)
    private Long pNum;

    @Column(name = "address")
    private String address;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "isAdmin", nullable = false)
    private Boolean isAdmin = false;

    // Default constructor
    public User() {
        super();
    }

    // Constructor with fields
    public User(String name, Long pNum, String address, String email, String pwd) {
        this.pwd = pwd;
        this.pNum = pNum;
        this.address = address;
        this.name = name;
        this.email = email;
    }

    // Getters and Setters
    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public Long getpNum() {
        return pNum;
    }

    public void setpNum(Long pNum) {
        this.pNum = pNum;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    @Override
    public String toString() {
        return "User [uid=" + uid + ", pwd=" + pwd + ", pNum=" + pNum + ", address=" + address + ", name=" + name
                + ", email=" + email + ", isAdmin=" + isAdmin + "]";
    }
}
