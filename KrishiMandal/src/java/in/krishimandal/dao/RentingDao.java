/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.dao;

import in.krishimandal.pojo.RentingProductsPojo;
import java.util.List;

/**
 *
 * @author mishr
 */
public interface RentingDao {
   
    String addRentingProduct(RentingProductsPojo product);
    
    List<RentingProductsPojo> getAllRentingProductsByType(String Category);
    
    List<RentingProductsPojo> getRentingProductsByUser(String userMobile);
    
    String updateRentingProduct(String productId,RentingProductsPojo product);



    
}






