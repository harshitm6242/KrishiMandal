/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.dao;

import in.krishimandal.pojo.ProductsPojo;
import java.util.List;

/**
 *
 * @author mishr
 */
public interface ProductDao {
    public String addProduct(ProductsPojo product);
    
    public String updateProduct(ProductsPojo prevProduct,ProductsPojo updatedProduct);
    public String updateProductPrice(String prodId,double UpdatedPrice);
    public List<ProductsPojo>getAllProducts();
    
    public List<ProductsPojo>getAllProductsByType(String Type);
    public List<ProductsPojo>searchAllProducts(String search);
    
    public ProductsPojo getProductDetails(String prodId);
    public int getProductQuantity(String prodId);
    
    public String updateProductWithoutImage(String prevProductId,ProductsPojo updatedProduct);
    public double getProductPrice(String prodId);
    
    public Boolean sellNProduct(String prodId,int n);
    public List<String>getAllProductsType();
    
    public byte[]getImage(String prodId);
    public String removeProduct(String prodId);
}
