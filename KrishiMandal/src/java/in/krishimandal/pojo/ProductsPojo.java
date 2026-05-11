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
public class ProductsPojo {

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public InputStream getImage() {
        return image;
    }

    public void setImage(InputStream image) {
        this.image = image;
    }
   
    private String productId;
    private String productName;
    private String productInfo;
    private String mobile;
    //private byte[] productImage;
    private InputStream image;
    private String productCategory;
    private int quantity;
    private double amount;
    private char availability;

    public ProductsPojo(String productId, String productName, String productInfo,  String productCategory, int quantity, double amount, char availability) {
        this.productId = productId;
        this.productName = productName;
        this.productInfo = productInfo;
        //this.productImage = productImage;
        this.productCategory = productCategory;
        this.quantity = quantity;
        this.amount = amount;
        this.availability = availability;
    }

    @Override
    public String toString() {
        return "ProductsPojo{" + "productId=" + productId + ", productName=" + productName + ", productInfo=" + productInfo +  ", productCategory=" + productCategory + ", quantity=" + quantity + ", amount=" + amount + ", availability=" + availability + '}';
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
    
    public ProductsPojo() {
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
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

//    public byte[] getProductImage() {
//        return productImage;
//    }
//
//    public void setProductImage(byte[] productImage) {
//        this.productImage = productImage;
//    }

    public String getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(String productCategory) {
        this.productCategory = productCategory;
    }

    public char getAvailability() {
        return availability;
    }

    public void setAvailability(char availability) {
        this.availability = availability;
    }
   
}
