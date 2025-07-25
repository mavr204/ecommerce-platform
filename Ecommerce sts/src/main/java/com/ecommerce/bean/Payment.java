package com.ecommerce.bean;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "transaction_time")
    private Timestamp transactionTime;

    @Column(name = "method")
    private String method;

    @Column(name = "transaction_acc_no")
    private String transactionAccNo;

    @Column(name = "amount")
    private int amount;

    // Constructors
    public Payment() {
        super();
    }

    public Payment(String transactionId, Timestamp transactionTime, String method, String transactionAccNo, int amount) {
        this.transactionId = transactionId;
        this.transactionTime = transactionTime;
        this.method = method;
        this.transactionAccNo = transactionAccNo;
        this.amount = amount;
    }

    // Getters and Setters
    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public Timestamp getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(Timestamp transactionTime) {
        this.transactionTime = transactionTime;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getTransactionAccNo() {
        return transactionAccNo;
    }

    public void setTransactionAccNo(String transactionAccNo) {
        this.transactionAccNo = transactionAccNo;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "Payment [transactionId=" + transactionId + ", transactionTime=" + transactionTime + ", method=" + method
                + ", transactionAccNo=" + transactionAccNo + ", amount=" + amount + "]";
    }
}
