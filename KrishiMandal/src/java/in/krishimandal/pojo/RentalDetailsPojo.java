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
public class RentalDetailsPojo {
    
     private String rentalId;
    private String mobile;
    private String name;
    private String pid;
    private String email;
    private int quantity;
    private String address;
    private String upimode;
    private double amount;
    private Long contact;
    private Date rentDate;
    private int duration;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUpimode() {
        return upimode;
    }

    public void setUpimode(String upimode) {
        this.upimode = upimode;
    }

    public Long getContact() {
        return contact;
    }

    public void setContact(Long contact) {
        this.contact = contact;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
    
   

    public RentalDetailsPojo() {
    }

    public RentalDetailsPojo(String rentalId, String mobile, String name, String pid, int quantity, String address, double amount, Date rentDate) {
        this.rentalId = rentalId;
        this.mobile = mobile;
        this.name = name;
        this.pid = pid;
        this.quantity = quantity;
        this.address = address;
        this.amount = amount;
        this.rentDate = rentDate;
    }

    public String getRentalId() {
        return rentalId;
    }

    public void setRentalId(String rentalId) {
        this.rentalId = rentalId;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getRentDate() {
        return rentDate;
    }

    public void setRentDate(Date rentDate) {
        this.rentDate = rentDate;
    }

    
    
    
}
