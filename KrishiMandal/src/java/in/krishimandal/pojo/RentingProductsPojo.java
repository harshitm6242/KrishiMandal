/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.pojo;

import java.io.InputStream;

/**
 *
 * @author mishr
 */
public class RentingProductsPojo {

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }
    
    private String productId;
    private String mobile;
    private String ownerName;
    private String productName;
    private String productInfo;
    private String category;
    private String address;
    private String district;
    private int rentingtime;
    private double productPrice;
    private int quantity;
    private InputStream image;
    
    

    public RentingProductsPojo(String district,String productId, String mobile, String ownerName, String productName, String productInfo, String category, String address, int rentingtime, double productPrice, int quantity,InputStream image) {
        this.productId = productId;
        this.mobile = mobile;
        this.ownerName = ownerName;
        this.productName = productName;
        this.productInfo = productInfo;
        this.category = category;
        this.address = address;
        this.rentingtime = rentingtime;
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.image = image;
        this.district=district;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getRentingtime() {
        return rentingtime;
    }

    public void setRentingtime(int rentingtime) {
        this.rentingtime = rentingtime;
    }

    public InputStream getImage() {
        return image;
    }

    public void setImage(InputStream image) {
        this.image = image;
    }

    public RentingProductsPojo() {
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductInfo() {
        return productInfo;
    }

    public void setProductInfo(String productInfo) {
        this.productInfo = productInfo;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    
}
