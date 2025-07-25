package com.ecommerce.services;

import com.ecommerce.bean.Payment;
import com.ecommerce.dao.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(String transactionId) {
        return paymentRepository.findById(transactionId);
    }

    public String savePayment(Payment payment) {
    	long currentTimeMillis = System.currentTimeMillis();
        Timestamp currentTimestamp = new Timestamp(currentTimeMillis);
        String transactionId = generateTransactionId();
        
        payment.setTransactionTime(currentTimestamp);
        payment.setTransactionId(transactionId);
        

        return paymentRepository.save(payment).getTransactionId();
    }

    public static String generateTransactionId() {
        // Generate a UUID and remove dashes
        String uuidPart = UUID.randomUUID().toString().replace("-", "");

        String timestampPart = String.valueOf(System.currentTimeMillis());

        int maxUuidLength = Math.min(32, uuidPart.length());
        int maxTimestampLength = Math.min(18, timestampPart.length()); 

        String truncatedUuidPart = uuidPart.substring(0, maxUuidLength);
        String truncatedTimestampPart = timestampPart.substring(0, maxTimestampLength);

        // Concatenate both parts to form the transaction ID
        return truncatedUuidPart + truncatedTimestampPart;
    }

    public void deletePayment(String transactionId) {
        paymentRepository.deleteById(transactionId);
    }
}
