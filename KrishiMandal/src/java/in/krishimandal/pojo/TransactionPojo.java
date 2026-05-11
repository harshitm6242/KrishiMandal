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
public class TransactionPojo {
    
    private String transId;
    private long mobile;
    private Date paymentDate;
    private double amount;
    

    public String getTransId() {
        return transId;
    }

    public void setTransId(String transId) {
        this.transId = transId;
    }

    public long getMobile() {
        return mobile;
    }

    public void setMobile(long mobile) {
        this.mobile = mobile;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public TransactionPojo(String transId, long mobile, Date paymentDate, double amount) {
        this.transId = transId;
        this.mobile = mobile;
        this.paymentDate = paymentDate;
        this.amount = amount;
    }

    public TransactionPojo() {
    }
    
  
    
}
