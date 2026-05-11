/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.dao.impl;

import in.krishimandal.dao.OrderDao;
import in.krishimandal.pojo.OrderDetailsPojo;
import in.krishimandal.pojo.RentalDetailsPojo;
import in.krishimandal.pojo.TransactionPojo;
import in.krishimandal.utility.DBUtil;
import in.krishimandal.utility.IDUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author mishr
 */
public class OrderDAOImpl implements OrderDao {
    
    public boolean addOrder(OrderDetailsPojo order){
        boolean status=false;
        Connection conn=DBUtil.provideConnection();
        PreparedStatement ps=null;
         if (order.getOrderId() == null) {
            order.setOrderId(IDUtil.generateTransId());       
         }
         System.out.println(order.getUserMobile());
        try{
            ps=conn.prepareStatement("INSERT INTO purchasedetails (orderid,usermobile,username,email,quantity,address,paymentid,upimode,contact,orderamount,orderdate)  values(?,?,?,?,?,?,?,?,?,?,?)");
             ps.setString(1,order.getOrderId());
             ps.setString(2,order.getUserMobile());
             System.out.println(order.getUserMobile());
             ps.setString(3,order.getUserName());
             //ps.setString(4,order.getProductId());
             ps.setString(4,order.getEmail());
             ps.setInt(5,order.getQuantity());
             ps.setString(6,order.getLocation());
             ps.setString(7,order.getOrderId());
             ps.setString(8,order.getPaymentMode());
             int contact=Math.toIntExact(order.getContactNo());
             ps.setInt(9,contact);
             ps.setDouble(10,order.getOrderAmount());
             java.util.Date today=new java.util.Date();
             java.sql.Date d1=new java.sql.Date(today.getTime());
             ps.setDate(11,d1);
             int count=ps.executeUpdate();
             status=count>0;
    }catch(SQLException ex){
            System.out.println("Exception in addOrder():"+ex);
            ex.printStackTrace();
        }
        DBUtil.closeStatement(ps);
        return status;
     }
    
    
    public boolean addRentingOrder(RentalDetailsPojo rental){
         boolean status=false;
        Connection conn=DBUtil.provideConnection();
        PreparedStatement ps=null;
         if (rental.getRentalId()== null) {
            rental.setRentalId(IDUtil.generateRentalId());
         }
        try{
            ps=conn.prepareStatement("INSERT INTO rentaldetail (rentalid,usermobile,name,email,quantity,address,paymentmode,contact,totalrentamount,duration,rentdate)  values(?,?,?,?,?,?,?,?,?,?,?)");
             ps.setString(1,rental.getRentalId());
             ps.setString(2,rental.getMobile());
             ps.setString(3,rental.getName());
             //ps.setString(4,order.getProductId());
             ps.setString(4,rental.getEmail());
             ps.setInt(5,rental.getQuantity());
             ps.setString(6,rental.getAddress());
             ps.setString(7,rental.getUpimode());
             int contact=Math.toIntExact(rental.getContact());
             ps.setInt(8,contact);
             ps.setDouble(9,rental.getAmount());
             ps.setInt(10,rental.getDuration());             
             java.util.Date today=new java.util.Date();
             java.sql.Date d1=new java.sql.Date(today.getTime());
             ps.setDate(11,d1);
             int count=ps.executeUpdate();
             status=count>0;
    }catch(SQLException ex){
            System.out.println("Exception in addOrder():"+ex);
            ex.printStackTrace();
        }
        DBUtil.closeStatement(ps);
        return status;
        
    }
    
    public boolean addTransaction(TransactionPojo transaction){
        boolean status=false;
        Connection conn=DBUtil.provideConnection();
        PreparedStatement ps=null;
        try{
            ps=conn.prepareStatement("insert into transactions values(?,?,?,?)");
             ps.setString(1,transaction.getTransId());
             ps.setLong(2,transaction.getMobile());
             java.util.Date d1=transaction.getPaymentDate();
             java.sql.Date d2=new java.sql.Date(d1.getTime());
             ps.setDate(3,d2);
             ps.setDouble(4,transaction.getAmount());
             int count=ps.executeUpdate();
             status=count>0;
    }catch(SQLException ex){
            System.out.println("Exception in addTransaction():"+ex);
            ex.printStackTrace();
        }
        DBUtil.closeStatement(ps);
        return status;
    }
    
//    public List<OrderDetailsPojo> getAllOrders(){
//        List<OrderDetailsPojo> ordersList=new ArrayList<>();
//        Connection conn=DBUtil.provideConnection();
//        Statement st=null;
//        ResultSet rs=null;
//        try{
//            st=conn.createStatement();
//            rs=st.executeQuery("select * from orders");
//            while(rs.next()){
//                OrderDetailsPojo order=new OrderDetailsPojo();
//                order.setOrderId(rs.getString("orderid"));
//                order.setUserMobile(rs.getString("usermobile"));
//                order.setUserName(rs.getString("username"));
//                order.setProductId(rs.getString("productid"));
//                order.setQuantity(rs.getInt("quantity"));
//                order.setLocation(rs.getString("location"));
//                order.setPaymentId(rs.getString("paymentid"));
//                order.setOrderAmount(rs.getDouble("amount"));
//                ordersList.add(order);
//            }
//        }catch(SQLException ex){
//            System.out.println("Exception in getAllOrders():"+ex);
//            ex.printStackTrace();
//        }
//        DBUtil.closeStatement(st);
//        DBUtil.closeResultSet(rs);
//        return ordersList;
//    }
    
    public List<OrderDetailsPojo> gerAllOrdersDetails(String usermobile){
        List<OrderDetailsPojo> orderDetailsList=new ArrayList<>();
        Connection conn=DBUtil.provideConnection();
        PreparedStatement ps=null;
        System.out.println(usermobile);
        ResultSet rs=null;
        try{
           ps=conn.prepareStatement("SELECT orderid,orderdate,orderamount,contact,username,quantity FROM purchasedetails WHERE usermobile = ?");
           ps.setString(1,usermobile);
           rs=ps.executeQuery();
            while(rs.next()){
                OrderDetailsPojo order=new OrderDetailsPojo();
                order.setOrderId(rs.getString("orderid"));
                //order.setUserMobile(rs.getString("usermobile"));
                order.setUserName(rs.getString("username"));
                //order.setProductId(rs.getString("productid"));
                order.setQuantity(rs.getInt("quantity"));
                //order.setLocation(rs.getString("location"));
                //order.setPaymentId(rs.getString("paymentid"));
                order.setContactNo(rs.getLong("contact"));
                order.setOrderAmount(rs.getDouble("orderamount"));
                order.setOrderDate(rs.getDate("orderdate"));
                orderDetailsList.add(order);
            }
        }catch(SQLException ex){
            System.out.println("Exception in gerAllOrdersDetails():"+ex);
            ex.printStackTrace();
        }
        DBUtil.closeStatement(ps);
        DBUtil.closeResultSet(rs);
        return orderDetailsList;
    }
    
    public List<RentalDetailsPojo> getAllRentalOrders(String usermobile){
        List<RentalDetailsPojo> list=new ArrayList<>();
        Connection conn=DBUtil.provideConnection();
        PreparedStatement ps=null;
        //System.out.println(usermobile);
        ResultSet rs=null;
        try{
           ps=conn.prepareStatement("SELECT * FROM rentaldetail WHERE usermobile = ?");
           ps.setString(1,usermobile);
           rs=ps.executeQuery();
            while(rs.next()){
                RentalDetailsPojo order=new RentalDetailsPojo();
                order.setRentalId(rs.getString("rentalid"));
                order.setName(rs.getString("name"));
                order.setRentDate(rs.getDate("rentDate"));
                order.setAmount(rs.getDouble("totalrentamount"));
                order.setContact(rs.getLong("contact"));
                order.setQuantity(rs.getInt("quantity"));
                list.add(order);
            }
        }catch(SQLException ex){
            System.out.println("Exception in gerAllOrdersDetails():"+ex);
            ex.printStackTrace();
        }
        DBUtil.closeStatement(ps);
        DBUtil.closeResultSet(rs);
        return list;
    }
}
