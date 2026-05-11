/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.dao;

import in.krishimandal.pojo.CartPojo;
import java.util.List;

/**
 *
 * @author mishr
 */
public interface CartDao {
    
     public String addProductToCart(CartPojo cart);
    
   // public String updateProductInCart(CartPojo cart);
    
    public List<CartPojo>getAllCartItems(Long usermobile);
    
    public int getCartItemsCount(Long usermobile,String itemid);
    
    public String removeProductFromCart(Long usermobile,String prodid);
    
    public Boolean removeAProduct(Long usermobile, String prodid);
}
