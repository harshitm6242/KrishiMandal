/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.dao.impl;

import in.krishimandal.dao.CartDao;
import in.krishimandal.pojo.CartPojo;
import in.krishimandal.utility.DBUtil;
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
public class CartDAOImpl implements CartDao {

    @Override
    public String addProductToCart(CartPojo cart) {
        String status="Failed to add into cart!";
         Connection conn=DBUtil.provideConnection();
         PreparedStatement ps1=null;
         PreparedStatement ps2=null;
         ResultSet rs=null;
         int ans=0;
         try{
             ps1=conn.prepareStatement("select * from CART where usermobile=? and prodid=?");
             ps1.setLong(1,cart.getMobile());
             ps1.setString(2,cart.getProdid());
             rs=ps1.executeQuery();
             if(rs.next()){
                 int qty=cart.getQuantity();
                 if(qty>0){
                 ps2=conn.prepareStatement("update CART set quantity=? where usermobile=? and prodid=?");
                 ps2.setInt(1,cart.getQuantity());
                 ps2.setLong(2,cart.getMobile());
                 ps2.setString(3,cart.getProdid());
                 ans=ps2.executeUpdate();
                 if(ans>0){
                     status="Product successfully updated into cart";
                 }
                 }else if(qty==0){
                  ps2=conn.prepareStatement("delete from CART where usermobile=? and prodid=?");
                  ps2.setLong(1,cart.getMobile());
                  ps2.setString(2,cart.getProdid());
                  ans=ps2.executeUpdate();
                 if(ans>0){
                     status="Product successfully updated into cart";
                 }else{
                     status="Could not updated the product!";
                 }
                }
         }else{
                 ps2=conn.prepareStatement("insert into CART values(?,?,?)");
                  ps2.setLong(1,cart.getMobile());
                 ps2.setString(2,cart.getProdid());
                 ps2.setInt(3,cart.getQuantity());
                 ans=ps2.executeUpdate();
                 if(ans>0){
                     status="Product successfully added to the cart";
                 }
                 else{
                     status="Could not added to cart!";
                 }
             }
             
         }catch(SQLException ex){
              status="Updation failed due to exception";
              System.out.println("Exception in updateProductInCart():"+ex);
              ex.printStackTrace();
         }
         DBUtil.closeStatement(ps1);
         DBUtil.closeStatement(ps2);
         DBUtil.closeResultSet(rs);
         
         return status;
    }

//    @Override
//    public String updateProductInCart(CartPojo cart) {
//         String status="Failed to add in cart!";
//         Connection conn=DBUtil.provideConnection();
//         PreparedStatement ps1=null;
//         ResultSet rs=null;
//         try{
//             ps1=conn.prepareStatement("Select * from CART where prodid=? and usermobile=?");
//             ps1.setString(1, cart.getProdid());
//             ps1.setLong(2,cart.getMobile());
//             rs=ps1.executeQuery();
//             if(rs.next()){
//                 ProductDAOImpl pj=new ProductDAOImpl();
//                 int stockQty=pj.getProductQuantity(cart.getProdid());
//                 int newQty=cart.getQuantity()+rs.getInt("quantity");
//                 if(stockQty<newQty){
//                     cart.setQuantity(stockQty);
//                     updateProductInCart(cart); 
//                     status="Only "+stockQty+" number of items is available in our stock so we are adding "+stockQty+"in your cart";
//                     DemandPojo demandPojo=new DemandPojo();
//                     demandPojo.setDemandQuantity(newQty-stockQty);
//                     demandPojo.setUseremail(cart.getUseremail());
//                     demandPojo.setProdId(cart.getProdId());
//                     DemandDAOImpl demandDao=new DemandDAOImpl();
//                     boolean result=demandDao.addProduct(demandPojo);
//                     if(result==true){
//                         status+="We will Mail you when "+(newQty-stockQty)+" number of items is available";
//                     }
//                     
//                 }else{
//                     cart.setQuantity(newQty);
//                     status=updateProductInCart(cart);
//                 }
//                 
//             }
//         }catch(SQLException ex){
//              status="Addition failed due to exception";
//              System.out.println("Exception in addProductToCart():"+ex);
//              ex.printStackTrace();
//         }
//         DBUtil.closeStatement(ps1);
//         DBUtil.closeResultSet(rs);
//         
//         return status;
//    }

    @Override
    public List<CartPojo> getAllCartItems(Long usermobile) {
         List<CartPojo> items=new ArrayList<>();
         Connection conn=DBUtil.provideConnection();
         PreparedStatement ps=null;
         ResultSet rs=null;
         try{
             ps=conn.prepareStatement("select * from CART where usermobile=?");
             ps.setLong(1,usermobile);
             rs=ps.executeQuery();
             while(rs.next()){
                 CartPojo cp=new CartPojo();
                 cp.setMobile(rs.getLong("usermobile"));
                 cp.setProdid(rs.getString("prodid"));
                 cp.setQuantity(rs.getInt("quantity"));
                 items.add(cp);
             }
         }catch(SQLException ex){
              System.out.println("Exception in getAllCartItems():"+ex);
              ex.printStackTrace();
         }
         DBUtil.closeStatement(ps);
         DBUtil.closeResultSet(rs);
         return items;
    }

    @Override
    public int getCartItemsCount(Long usermobile, String itemid) {
        if(usermobile==null || itemid==null){
             return 0;
         }
         Connection conn=DBUtil.provideConnection();
         PreparedStatement ps=null;
         ResultSet rs=null;
         int quantity=0;
         try{
             ps=conn.prepareStatement("select quantity from CART where usermobile=? and prodid=?");
             ps.setLong(1, usermobile);
             ps.setString(2, itemid);
             rs=ps.executeQuery();
             if(rs.next()){
                 quantity=rs.getInt(1);
             }
         }catch(SQLException ex){
              System.out.println("Exception in getCartItemsCount():"+ex);
              ex.printStackTrace();
         }
         DBUtil.closeStatement(ps);
         DBUtil.closeResultSet(rs);
         return quantity;
    }

    @Override
    public String removeProductFromCart(Long usermobile, String prodid) {
         String status="Product Removal Failed!";
         Connection conn=DBUtil.provideConnection();
         PreparedStatement ps1=null;
         PreparedStatement ps2=null;
         ResultSet rs=null;
          try{
              ps1=conn.prepareStatement("select * from CART where usermobile=? and prodid=?");
              ps1.setLong(1, usermobile);
              ps1.setString(2, prodid);
              rs=ps1.executeQuery();
              if(rs.next()){
                  int quantity=rs.getInt("quantity");
                  quantity-=1;
                  if(quantity>0){
                      ps2=conn.prepareStatement("update CART set qunatity=? where usermobile=? and prodid=?");
                      ps2.setInt(1,quantity);
                      ps2.setLong(2, usermobile);
                      ps2.setString(3, prodid);
                      int k= ps2.executeUpdate();
                      if(k>0)
                          status="Product Succesfully updated";
                  }else{
                      ps2=conn.prepareStatement("delete from CART where usermobile=? and prodid=?");
                      ps2.setLong(1, usermobile);
                      ps2.setString(2, prodid);
                      int k= ps2.executeUpdate();
                      if(k>0)
                          status="Product Succesfully removed";
                  }
              }
          }catch(SQLException ex){
              status="Removal Failed due to Exception";
              System.out.println("Exception in removeProductFromCart():"+ex);
              ex.printStackTrace();
         }
         DBUtil.closeStatement(ps1);
         DBUtil.closeStatement(ps2);
         DBUtil.closeResultSet(rs);
         return status;
    }

    @Override
    public Boolean removeAProduct(Long usermobile, String prodid) {
        boolean status=false;
         Connection conn=DBUtil.provideConnection();
         PreparedStatement ps=null;
         try{
             ps=conn.prepareStatement("delete from cart where usermobile=? and prodid=?");
             ps.setLong(1,usermobile);
             ps.setString(2, prodid);
             int k=ps.executeUpdate();
             if(k>0)
                 status=true;
         }catch(SQLException ex){
              System.out.println("Exception in removeAProduct():"+ex);
              ex.printStackTrace();
         }
         DBUtil.closeStatement(ps);
         return status;
    }
    
}
