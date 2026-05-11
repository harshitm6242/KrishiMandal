/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.pojo;

/**
 *
 * @author mishr
 */
public class CartPojo {

    private String prodid;
    private long mobile;
    private int quantity;
    
    
    
    public String getProdid() {
        return prodid;
    }

    public void setProdid(String prodid) {
        this.prodid = prodid;
    }

    public long getMobile() {
        return mobile;
    }

    public void setMobile(long mobile) {
        this.mobile = mobile;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


    public CartPojo(String prodid, long mobile, int quantity) {
        this.prodid = prodid;
        this.mobile = mobile;
        this.quantity = quantity;
       
    }

    public CartPojo() {
    }
   
}
