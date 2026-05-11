/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.dao.impl;

import in.krishimandal.dao.ProductDao;
import in.krishimandal.pojo.ProductsPojo;
import in.krishimandal.utility.DBUtil;
import in.krishimandal.utility.IDUtil;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


public class ProductDAOImpl implements ProductDao {

    public String addProduct(ProductsPojo product) {
        String status = "Product Registration Failed";
        if (product.getProductId() == null) {
            product.setProductId(IDUtil.generateProdId());
        }
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        
        try {
            ps = conn.prepareStatement("INSERT INTO products (productid,usermobile, productname, productinfo,productimage, productcategory, quantity, productprice, availability) VALUES (?,?,?,?,?,?,?,?,?)");
            ps.setString(1, product.getProductId());
            ps.setString(2,product.getMobile());
            ps.setString(3, product.getProductName());
            ps.setString(4, product.getProductInfo());
            ps.setBlob(5,product.getImage());
            ps.setString(6, product.getProductCategory());
            ps.setInt(7, product.getQuantity());
            ps.setDouble(8, product.getAmount());
            ps.setString(9, "Y");
            
            int count = ps.executeUpdate();
            if (count == 1) {
                status = "Product Added Successfully";
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in addProduct method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeStatement(ps);
        }
        return status;
    }

    
    public String updateProduct(ProductsPojo preProduct, ProductsPojo updateProduct) {
        String status = "Update Failed";
        
        if (!preProduct.getProductId().equals(updateProduct.getProductId())) {
            return "Product IDs Do Not Match. Update Failed";
        }
        
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        
        try {
            ps = conn.prepareStatement("UPDATE products SET productname=?, productinfo=?, productimage=?, productcategory=?, quantity=?, amount=? WHERE productid=?");
            
            ps.setString(1, updateProduct.getProductName());
            ps.setString(2, updateProduct.getProductInfo());
            //ps.setBytes(3, updateProduct.getProductImage());
            ps.setString(4, updateProduct.getProductCategory());
            ps.setInt(5, updateProduct.getQuantity());
            ps.setDouble(6, updateProduct.getAmount());
            ps.setString(7, updateProduct.getProductId());
            
            int count = ps.executeUpdate();
            if (count == 1) {
                status = "Product Updated Successfully";
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in updateProduct method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeStatement(ps);
        }
        return status;
    }

    @Override
    public String updateProductPrice(String productId, double newAmount) {
        String status = "Price Update Failed";
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        
        try {
            ps = conn.prepareStatement("UPDATE products SET amount=? WHERE productid=?");
            ps.setDouble(1, newAmount);
            ps.setString(2, productId);
            
            int count = ps.executeUpdate();
            if (count == 1) {
                status = "Product Price Updated Successfully";
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in updateProductPrice method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeStatement(ps);
        }
        return status;
    }

    @Override
    public List<ProductsPojo> getAllProducts() {
        List<ProductsPojo> products = new ArrayList<>();
        Connection conn = DBUtil.provideConnection();
        Statement st = null;
        ResultSet rs = null;
        
        try {
            st = conn.createStatement();
            rs = st.executeQuery("SELECT * FROM products WHERE availability='Y'");
            
            while (rs.next()) {
                ProductsPojo product = new ProductsPojo();
                product.setProductId(rs.getString("productid"));
                product.setProductName(rs.getString("productname"));
                product.setProductInfo(rs.getString("productinfo"));
                //product.setProductImage(rs.getAsciiStream("productimage"));
                product.setProductCategory(rs.getString("productcategory"));
                product.setQuantity(rs.getInt("quantity"));
                product.setAmount(rs.getDouble("amount"));
                products.add(product);
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in getAllProducts method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closeStatement(st);
        }
        return products;
    }

    @Override
    public List<ProductsPojo> getAllProductsByType(String category) {
        List<ProductsPojo> products = new ArrayList<>();
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        
        try {
            ps = conn.prepareStatement(" SELECT * FROM products WHERE productcategory LIKE ?");
            ps.setString(1,category);
            rs = ps.executeQuery();
            
            while (rs.next()) {
                ProductsPojo product = new ProductsPojo();
                product.setProductId(rs.getString("productid"));
                product.setProductName(rs.getString("productname"));
                product.setProductInfo(rs.getString("productinfo"));
                product.setImage(rs.getAsciiStream("productimage"));
                product.setProductCategory(rs.getString("productcategory"));
                product.setQuantity(rs.getInt("quantity"));
                product.setAmount(rs.getDouble("productprice"));
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

       @Override
    public List<ProductsPojo> searchAllProducts(String search) {
        List<ProductsPojo> products = new ArrayList<>();
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        
        try {
            ps = conn.prepareStatement("SELECT * FROM products WHERE (LOWER(productname) LIKE ? OR LOWER(productcategory) LIKE ? OR LOWER(productinfo) LIKE ?) ORDER BY productprice ASC");
            String searchTerm = "%" + search.toLowerCase() + "%";
            ps.setString(1, searchTerm);
            ps.setString(2, searchTerm);
            ps.setString(3, searchTerm);
            
            rs = ps.executeQuery();
            while (rs.next()) {
                ProductsPojo product = new ProductsPojo();
                product.setProductId(rs.getString("productid"));
                product.setProductName(rs.getString("productname"));
                product.setProductInfo(rs.getString("productinfo"));
                //product.setProductImage(rs.getAsciiStream("productimage"));
                product.setProductCategory(rs.getString("productcategory"));
                product.setQuantity(rs.getInt("quantity"));
                product.setAmount(rs.getDouble("productprice"));
                product.setMobile(rs.getString("usermobile"));
                products.add(product);
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in searchProducts method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closeStatement(ps);
        }
        return products;
    }
    
    @Override
    public ProductsPojo getProductDetails(String prodId) {
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        ProductsPojo product = null;
        
        try {
            ps = conn.prepareStatement("SELECT * FROM products WHERE productid=? AND availability='Y'");
            ps.setString(1, prodId);
            rs = ps.executeQuery();
            
            if (rs.next()) {
                product = new ProductsPojo();
                product.setProductId(rs.getString("productid"));
                product.setProductName(rs.getString("productname"));
                product.setProductInfo(rs.getString("productinfo"));
                //product.setProductImage(rs.getAsciiStream("productimage"));
                product.setProductCategory(rs.getString("productcategory"));
                product.setQuantity(rs.getInt("quantity"));
                product.setAmount(rs.getDouble("amount"));
                char available =rs.getString("availability").charAt(0);
                product.setAvailability(available);
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in getProductDetails method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closeStatement(ps);
        }
        return product;
    }

    @Override
    public int getProductQuantity(String prodId) {
        int quantity = 0;
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        
        try {
            ps = conn.prepareStatement("SELECT quantity FROM products WHERE productid=?");
            ps.setString(1, prodId);
            rs = ps.executeQuery();
            
            if (rs.next()) {
                quantity = rs.getInt("quantity");
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in getProductQuantity method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closeStatement(ps);
        }
        return quantity;
    }

   
    @Override
public String updateProductWithoutImage(String preProductId, ProductsPojo updateProduct) {
    String status = "Updation Failed";
    if (!preProductId.equals(updateProduct.getProductId())) {
        status = "Product ID's Do Not Match. Updation Failed";
        return status;
    }
    PreparedStatement ps = null;
    int prevQuantity = 0;
    Connection conn = DBUtil.provideConnection();
    try {
        prevQuantity = getProductQuantity(preProductId);
        ps = conn.prepareStatement("update products set productname=?, productcategory=?, productinfo=?, amount=?, quantity=? where productid=?");
        ps.setString(1, updateProduct.getProductName());
        ps.setString(2, updateProduct.getProductCategory());
        ps.setString(3, updateProduct.getProductInfo());
        ps.setDouble(4, updateProduct.getAmount());
        ps.setInt(5, updateProduct.getQuantity());
        ps.setString(6, updateProduct.getProductId());
        
        int count = ps.executeUpdate();
        if (count == 1 && prevQuantity < updateProduct.getQuantity()) {
            status = "Product Updated Successfully And Mail sent";
            //for sending email
        }
        else if(count == 1) {
            status = "Product Updated Successfully";
        }
    } catch (SQLException ex) {
        System.out.println("Exception occurred in updateProductWithoutImage method: " + ex);
        ex.printStackTrace();
    } finally {
        DBUtil.closeStatement(ps);
    }
    return status;
}

    @Override
    public double getProductPrice(String prodId) {
        double amount = 0.0;
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        
        try {
            ps = conn.prepareStatement("SELECT amount FROM products WHERE productid=?");
            ps.setString(1, prodId);
            rs = ps.executeQuery();
            
            if (rs.next()) {
                amount = rs.getDouble("amount");
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in getProductPrice method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closeStatement(ps);
        }
        return amount;
    }

    @Override
    public Boolean sellNProduct(String prodId, int n) {
        boolean success = false;
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        
        try {
            ps = conn.prepareStatement(
                "UPDATE products SET quantity = quantity - ? " +
                "WHERE productid=? AND availability='Y' AND quantity >= ?"
            );
            ps.setInt(1, n);
            ps.setString(2, prodId);
            ps.setInt(3, n);
            
            int count = ps.executeUpdate();
            if(count == 1){
                success= true;
}
        } catch (SQLException ex) {
            System.out.println("Exception occurred in sellNProduct method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeStatement(ps);
        }
        return success;
    }

    @Override
    public List<String> getAllProductsType() {
        List<String> types = new ArrayList<>();
        Connection conn = DBUtil.provideConnection();
        Statement st = null;
        ResultSet rs = null;
        
        try {
            st = conn.createStatement();
            rs = st.executeQuery("SELECT DISTINCT productcategory FROM products WHERE availability='Y'");
            
            while (rs.next()) {
                types.add(rs.getString("productcategory"));
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in getAllProductsType method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closeStatement(st);
        }
        return types;
    }

    @Override
    public byte[] getImage(String prodId) {
        byte[] imageData = null;
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        
        try {
            ps = conn.prepareStatement("SELECT productimage FROM products WHERE productid=?");
            ps.setString(1, prodId);
            rs = ps.executeQuery();
            
            if (rs.next()) {
                // Since productimage is VARCHAR in your schema, we'll get the string path
                String imagePath = rs.getString("productimage");
                // You might want to implement logic here to convert the path to actual image bytes
                // This depends on how you're storing/handling images in your application
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in getImage method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closeStatement(ps);
        }
        return imageData;
    }

    @Override
    public String removeProduct(String productId) {
        String status = "Product Removal Failed";
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps1 = null;
        PreparedStatement ps2 = null;
        
        try {
            // First update product availability
            ps1 = conn.prepareStatement("UPDATE products SET availability='N' WHERE productid=?");
            ps1.setString(1,"N");
            ps1.setString(1, productId);
            int update = ps1.executeUpdate();
            
            if (update == 1) {
                // Then remove from cart
                ps2 = conn.prepareStatement("DELETE FROM cart WHERE productid=?");
                ps2.setString(1, productId);
                ps2.executeUpdate();
                status = "Product Removed Successfully";
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in removeProduct method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeStatement(ps1);
            DBUtil.closeStatement(ps2);
        }
        return status;
    }    
}
