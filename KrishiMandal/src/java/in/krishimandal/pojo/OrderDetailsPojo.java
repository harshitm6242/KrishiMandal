/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.pojo;

import java.util.Date;

/**
 *
 * @author mishr
 */
public class OrderDetailsPojo {

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public Long getContactNo() {
        return contactNo;
    }

    public void setContactNo(Long contactNo) {
        this.contactNo = contactNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    private String orderId;
    private String userMobile;
    private String userName;
    private String productId;
    private String email;
    private int quantity;
    private String location;
    private String paymentId;
    private String paymentMode;
    private Long contactNo;
    private double orderAmount;  
    private Date orderDate;

    @Override
    public String toString() {
        return "OrderDetailsPojo{" + "orderId=" + orderId + ", userMobiile=" + userMobile + ", userName=" + userName + ", productId=" + productId + ", quantity=" + quantity + ", location=" + location + ", paymentId=" + paymentId + ", orderAmount=" + orderAmount +",orderDate="+ orderDate + '}';
    }

    public OrderDetailsPojo(String email,Date orderDate,String orderId, String userMobile, String userName, String productId, int quantity, String location, String paymentId, double orderAmount) {
        this.orderId = orderId;
        this.userMobile = userMobile;
        this.userName = userName;
        this.productId = productId;
        this.quantity = quantity;
        this.location = location;
        this.paymentId = paymentId;
        this.orderAmount = orderAmount;
        this.orderDate=orderDate;
        this.email=email;
    }

    public OrderDetailsPojo() {
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getUserMobile() {
        return userMobile;
    }

    public void setUserMobile(String userMobile) {
        this.userMobile = userMobile;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public double getOrderAmount() {
        return orderAmount;
    }

    public void setOrderAmount(double orderAmount) {
        this.orderAmount = orderAmount;
    }
    
    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }
    
    
}
