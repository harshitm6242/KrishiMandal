/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.dao;

import in.krishimandal.pojo.UserPojo;

/**
 *
 * @author mishr
 */
public interface UserDao {
    String registerUser(UserPojo user);
    boolean isRegistered(String usermobile);
    String isValidCredentails(String usermobile,String password,int otp,int generatedOtp);
    UserPojo getUserDetails(String usermobile);
    String getUserFirstName(String usermobile);
    String getUserAddr(String usermobile);
    String getUserPincode(String usermobile);
    String profileUpdate(String usermobile,UserPojo user);
}
