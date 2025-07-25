package com.ecommerce.controller;

import com.ecommerce.bean.Payment;
import com.ecommerce.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable String transactionId) {
        Optional<Payment> payment = paymentService.getPaymentById(transactionId);
        return payment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/addpay")
    public String createPayment(
            @RequestParam("method") String method,
            @RequestParam("transactionAccNo") String transactionAccNo,
            @RequestParam("amount") int amount) {

        Payment payment = new Payment();
        payment.setMethod(method);
        payment.setTransactionAccNo(transactionAccNo);
        payment.setAmount(amount);
        return paymentService.savePayment(payment);
    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<Void> deletePayment(@PathVariable String transactionId) {
        paymentService.deletePayment(transactionId);
        return ResponseEntity.noContent().build();
    }
}
