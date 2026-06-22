/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.dao.impl;

import in.krishimandal.dao.UserDao;
import in.krishimandal.pojo.UserPojo;
import in.krishimandal.utility.DBUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;

/**
 *
 * @author mishr
 */
public class UserDAOImpl implements UserDao{
    private boolean isConnectionUnavailable(Connection conn) {
        return conn == null;
    }

     public boolean isRegistered(String mobile){
        boolean flag=false;
        PreparedStatement ps=null;
        ResultSet rs=null;
        Connection conn=DBUtil.provideConnection();
        if (isConnectionUnavailable(conn)) {
            return false;
        }
        try{
            // Treat the incoming identifier as email for registration checks
            ps=conn.prepareStatement("select 1 from users where email=?");
            // select 1 is sufficient to know whether a row exists
            ps.setString(1,mobile);
            rs=ps.executeQuery();
            if(rs.next()){
                flag=true;
            }
            
        }catch(SQLException ex){
            System.out.println("Exception in isRegistered():"+ex);
            ex.printStackTrace();
        }
        DBUtil.closeResultSet(rs);
        DBUtil.closeStatement(ps);
        return flag; 
    }
    
    public String registerUser(UserPojo user){
        String status="Registration Failed";
        Connection conn=DBUtil.provideConnection();
        if (isConnectionUnavailable(conn)) {
            return "Database Unavailable";
        }
        PreparedStatement ps=null;
        ResultSet rs=null;
        boolean originalAutoCommit=true;
        try{
            originalAutoCommit = conn.getAutoCommit();
            conn.setAutoCommit(false);

            ps = conn.prepareStatement("select 1 from users where email=?");
            ps.setString(1, user.getEmail());
            rs = ps.executeQuery();
            if (rs.next()) {
                conn.rollback();
                return "Email Already Registered";
            }

            DBUtil.closeResultSet(rs);
            DBUtil.closeStatement(ps);
            rs = null;
            ps = null;

            ps=conn.prepareStatement("INSERT INTO users (usermobile, email,username, password) VALUES (?,?,?,?)");
             ps.setString(1,user.getUserMobile());
             ps.setString(2,user.getEmail());
             ps.setString(3,user.getUserName());
             ps.setString(4,user.getPassword());
             int count=ps.executeUpdate();
             if(count==1){
                 conn.commit();
                 status="Registration Successful";
                 //code to send email;
             } else {
                 conn.rollback();
             }
        }catch(SQLException ex){
            System.out.println("Exception in registerUser():"+ex);
            ex.printStackTrace();
            try {
                conn.rollback();
            } catch (SQLException rollbackEx) {
                System.out.println("Exception in registerUser() rollback:" + rollbackEx);
                rollbackEx.printStackTrace();
            }
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closeStatement(ps);
            try {
                conn.setAutoCommit(originalAutoCommit);
            } catch (SQLException ex) {
                System.out.println("Exception in registerUser() autocommit reset:" + ex);
                ex.printStackTrace();
            }
        }
        return status;
        
    }
    
    public String isValidCredentails(String mobile,String password,int otp,int generatedOtp){
        PreparedStatement ps=null;
        ResultSet rs=null;
        Connection conn=DBUtil.provideConnection();
        String status="Login Denied: Invalid username password";
        if (isConnectionUnavailable(conn)) {
            return "Database Unavailable";
        }
        //if(otp==0){
        try{
            // Here 'mobile' parameter contains email address
            ps=conn.prepareStatement("select 1 from users where email=? and password=?");
            ps.setString(1, mobile);
            ps.setString(2, password);
            rs=ps.executeQuery();
            if(rs.next()){
                // If a matching record is found, return a clear success message
                status = "Login Successfully";
            }
        }catch(SQLException ex){
            status="Error"+ex.getMessage();
            System.out.println("Exception in isValidCredentails():"+ex);
            ex.printStackTrace();
        }
//        }else{
//            if(otp==generatedOtp)
//                status="Login Successfully";
//            else
//                status="Invalid OTP";
//        }
        DBUtil.closeResultSet(rs);
        DBUtil.closeStatement(ps);
        return status; 
    }
    
    
    public UserPojo getUserDetails(String mobile){
        UserPojo user=null;
        PreparedStatement ps=null;
        ResultSet rs=null;
        Connection conn=DBUtil.provideConnection();
        if (isConnectionUnavailable(conn)) {
            return null;
        }
        System.out.println(mobile);
        try{
            // Treat input as email
            ps=conn.prepareStatement("select * from users where email=?");
            ps.setString(1,mobile);
            rs=ps.executeQuery();
            if(rs.next()){
                user=new UserPojo();
                user.setUserMobile(rs.getString("usermobile"));
                user.setEmail(rs.getString("email"));
                user.setUserName(rs.getString("username"));
                //user.setAge(rs.getInt("age"));
               // user.setAddress(rs.getString("address"));
                //java.sql.Date d1=rs.getDate("dob");
                //java.util.Date d2=new java.util.Date(d1.getTime());
               // user.setDob(d2);
                //user.setPincode(rs.getString("pincode"));
                //user.setState(rs.getString("state"));
                //user.setDistrict(rs.getString("district"));
               // user.setGender(rs.getString("gender"));
                java.sql.Date d3=rs.getDate("registrationdate");
                java.util.Date d4=new java.util.Date(d3.getTime());
                user.setRegistrationDate(d4);
            }
        }catch(SQLException ex){
            System.out.println("Exception in getUserDetails()"+ex);
            ex.printStackTrace();
        }
        DBUtil.closeResultSet(rs);
        DBUtil.closeStatement(ps);
        return user;
    }
    
    public String getUserFirstName(String mobile){
        String name=null;
        PreparedStatement ps=null;
        ResultSet rs=null;
        Connection conn=DBUtil.provideConnection();
        if (isConnectionUnavailable(conn)) {
            return null;
        }
        try{
            ps=conn.prepareStatement("select username from users where email=?");
            ps.setString(1, mobile);
            rs=ps.executeQuery();
            if(rs.next()){
                String fullName=rs.getString("username");
                name=fullName.split(" ")[0];
//                name=rs.getString("username");
//                int x=name.indexOf(" ");
//                name=name.substring(0,x);
            }
        }catch(SQLException ex){
            System.out.println("Exception in getUserFirstName()"+ex);
            ex.printStackTrace();
        }
         DBUtil.closeResultSet(rs);
        DBUtil.closeStatement(ps);
        return name;
        
    }
    
    
    public String getUserAddr(String mobile){
        String address=null;
        PreparedStatement ps=null;
        ResultSet rs=null;
        Connection conn=DBUtil.provideConnection();
        if (isConnectionUnavailable(conn)) {
            return "Error:Database Unavailable";
        }
        try{
            ps=conn.prepareStatement("select address from users where email=?");
            ps.setString(1, mobile);
            rs=ps.executeQuery();
            if(rs.next()){
                address=rs.getString("address");
            }
        }catch(SQLException ex){
            address="Error:"+ex.getMessage();
            System.out.println("Exception in getUserFirstName()"+ex);
            ex.printStackTrace();
        }
         DBUtil.closeResultSet(rs);
        DBUtil.closeStatement(ps);
        return address;
    }
    
    public String getUserPincode(String usermobile){
        String pincode=null;
        PreparedStatement ps=null;
        ResultSet rs=null;
        Connection conn=DBUtil.provideConnection();
        if (isConnectionUnavailable(conn)) {
            return "Error:Database Unavailable";
        }
        try{
            ps=conn.prepareStatement("select pincode from users where email=?");
            ps.setString(1, usermobile);
            rs=ps.executeQuery();
            if(rs.next()){
                pincode=rs.getString("pincode");
            }
        }catch(SQLException ex){
            pincode="Error:"+ex.getMessage();
            System.out.println("Exception in getUserPincode()"+ex);
            ex.printStackTrace();
        }
         DBUtil.closeResultSet(rs);
        DBUtil.closeStatement(ps);
        return pincode;
    }
    
    public String profileUpdate(String usermobile,UserPojo user){
        String status="Updation Failed!";
        Connection conn=DBUtil.provideConnection();
        if (isConnectionUnavailable(conn)) {
            return "Database Unavailable";
        }
        PreparedStatement ps=null;
        try{
            ps=conn.prepareStatement("insert into users values(?,?,?,?,?,?,?,?) where email=? ");
             ps.setString(9,usermobile);
             ps.setString(1,user.getUserName());
             ps.setInt(2,user.getAge());
             ps.setString(3,user.getAddress());
             java.util.Date d1=user.getDob();
             java.sql.Date d2=new java.sql.Date(d1.getTime());
             ps.setDate(4, d2);
             ps.setString(5,user.getPincode());
             ps.setString(6,user.getState());
             ps.setString(7,user.getDistrict());
             java.util.Date d3=new java.util.Date();
             java.sql.Date d4=new java.sql.Date(d3.getTime());
             ps.setDate(8,d4);
             int count=ps.executeUpdate();
             if(count==1){
                 status="Profile Update Successfully";
                 //code to send email;
             }
        }catch(SQLException ex){
            System.out.println("Exception in profileUpdate():"+ex);
            ex.printStackTrace();
        }
        DBUtil.closeStatement(ps);
        return status;
        
    }
    
    
}
