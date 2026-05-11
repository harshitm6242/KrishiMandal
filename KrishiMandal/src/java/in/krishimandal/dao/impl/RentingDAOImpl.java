/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.dao.impl;

import in.krishimandal.dao.RentingDao;
import in.krishimandal.pojo.ProductsPojo;
import in.krishimandal.pojo.RentingProductsPojo;
import in.krishimandal.utility.DBUtil;
import in.krishimandal.utility.IDUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author mishr
 */
public class RentingDAOImpl implements RentingDao{
    
     public String addRentingProduct(RentingProductsPojo product) {
        String status = "Renting Product Registration Failed";
        Connection conn = DBUtil.provideConnection();
        if(product.getProductId()==null){
            product.setProductId(IDUtil.generateProdId());
        }
        PreparedStatement ps = null;
        try {
            ps = conn.prepareStatement("INSERT INTO rentingproducts (pid, pinfo, pname, rentingtime, quantity, pprice,pcategory) VALUES (?,?,?,?,?,?,?)");
            ps.setString(1, product.getProductId());
            ps.setString(2, product.getProductInfo());
            ps.setString(3, product.getProductName());
            ps.setInt(4, product.getRentingtime());
            ps.setInt(5, product.getQuantity());
            ps.setDouble(6, product.getProductPrice());
            ps.setString(7,product.getCategory());
            //ps.setString(11, product.getDistrict());
            
            int count = ps.executeUpdate();
            if (count == 1) {
                status = "Renting Product Added Successfully" ;
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in addRentingProduct method: " + ex);
            ex.printStackTrace();
        }
        finally {
            DBUtil.closeStatement(ps);
        }
        return status;
    }
    
    public List<RentingProductsPojo> getAllRentingProductsByType(String category) {
        List<RentingProductsPojo> products = new ArrayList<>();
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        
        try {
            ps = conn.prepareStatement(" SELECT * FROM rentingproducts WHERE pcategory LIKE ?");
            ps.setString(1,category);
            rs = ps.executeQuery();
            
            while (rs.next()) {
                RentingProductsPojo product = new RentingProductsPojo();
                product.setProductId(rs.getString("pid"));
                product.setProductName(rs.getString("pname"));
                product.setProductInfo(rs.getString("pinfo"));
                //product.setProductImage(rs.getAsciiStream("productimage"));
                product.setCategory(rs.getString("pcategory"));
                product.setQuantity(rs.getInt("quantity"));
                product.setProductPrice(rs.getDouble("pprice"));
                product.setRentingtime(rs.getInt("rentingtime"));
                product.setMobile(rs.getString("usermobile"));
                products.add(product);
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in getAllProductsByCategory method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closeStatement(ps);
        }
        return products;
    }
    public List<RentingProductsPojo> getRentingProductsByUser(String userMobile) {
        List<RentingProductsPojo> rentingProducts = new ArrayList<>();
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = conn.prepareStatement("SELECT * FROM rentingproducts WHERE usermobile=?");
            ps.setString(1, userMobile);
            rs = ps.executeQuery();
            while (rs.next()) {
                RentingProductsPojo product = new RentingProductsPojo();
                product.setProductId(rs.getString("pid"));
                product.setProductName(rs.getString("pname"));
                product.setProductInfo(rs.getString("pinfo"));
               // product.setProductImage(rs.getString("productimage"));
                product.setCategory(rs.getString("pcategory"));
                product.setQuantity(rs.getInt("quantity"));
                product.setProductPrice(rs.getDouble("pprice"));
                rentingProducts.add(product);
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in getRentingProductsByUser method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closeStatement(ps);
        }
        return rentingProducts;
    }

  
    public String updateRentingProduct(String productId, RentingProductsPojo product) {
        String status = "Update Failed";
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        try {
            ps = conn.prepareStatement("UPDATE rentingproducts SET pname=?, pinfo=?, pcategory=?, quantity=?, pprice=? WHERE pid=?");
            ps.setString(1, product.getProductName());
            ps.setString(2, product.getProductInfo());
            //ps.setString(3, product.getProductImage());
            ps.setString(3, product.getCategory());
            ps.setInt(4, product.getQuantity());
            ps.setDouble(5, product.getProductPrice());
            ps.setString(6, productId);
            int count = ps.executeUpdate();
            if (count == 1) {
                status = "Renting Product Updated Successfully";
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in updateRentingProduct method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeStatement(ps);
        }
        return status;
}

    
}
