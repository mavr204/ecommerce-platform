package com.ecommerce.bean;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Orders {
    @Id
    @Column(name = "orderId")
    private String orderId;
    
    @Column(name = "uid")
    private Integer uid;
    
    @Column(name = "pid")
    private Integer pid;
    
    @Column(name = "orderStatus")
    private String orderStatus;
    
    @Column(name = "orderDate")
    private Date orderDate;
    
    @Column(name = "deliveryDate")
    private Date deliveryDate;
    
    @Column(name = "address")
    private String address;
    
    @Column(name = "transactionId")
    private String transactionId;

    public Orders() {
        super();
        // TODO Auto-generated constructor stub
    }

    public Orders(String orderId, Integer uid, Integer pid, String orderStatus, Date orderDate, Date deliveryDate,
                  String address, String transactionId) {
        super();
        this.orderId = orderId;
        this.uid = uid;
        this.pid = pid;
        this.orderStatus = orderStatus;
        this.orderDate = orderDate;
        this.deliveryDate = deliveryDate;
        this.address = address;
        this.transactionId = transactionId;
    }

    @Override
    public String toString() {
        return "Orders [orderId=" + orderId + ", uid=" + uid + ", pid=" + pid + ", orderStatus=" + orderStatus
                + ", orderDate=" + orderDate + ", deliveryDate=" + deliveryDate + ", address=" + address
                + ", transactionId=" + transactionId + "]";
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
}
