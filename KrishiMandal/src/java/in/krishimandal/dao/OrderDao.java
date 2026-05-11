/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.dao;

import in.krishimandal.pojo.OrderDetailsPojo;
import in.krishimandal.pojo.RentalDetailsPojo;
import in.krishimandal.pojo.TransactionPojo;
import java.util.List;

/**
 *
 * @author mishr
 */
public interface OrderDao {
    public boolean addOrder(OrderDetailsPojo order);
    
    public boolean addRentingOrder(RentalDetailsPojo rental);
    
    public boolean addTransaction(TransactionPojo transaction);
    
    public List<RentalDetailsPojo> getAllRentalOrders(String usermobile);
    
    //public List<OrderDetailsPojo> getAllOrders();
    
    public List<OrderDetailsPojo> gerAllOrdersDetails(String usermobile);
    
}
