/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.dao.impl;

import in.krishimandal.dao.TransactionDao;
import in.krishimandal.utility.DBUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author mishr
 */
public class TransactionDAOImpl implements TransactionDao {
    
     public Long getUserMobile(String transid){
         Long mobile=0L;
         Connection conn=DBUtil.provideConnection();
         PreparedStatement ps=null;
         ResultSet rs=null;
         try{
             ps=conn.prepareStatement("select usermobile from transactions where transid=?");
             ps.setString(1, transid);
             rs=ps.executeQuery();
             if(rs.next()){
                 mobile=rs.getLong("usermobile");
             }
         }catch(SQLException ex){
            System.out.println("Exception in getUserId():"+ex);
            ex.printStackTrace();
        }
            DBUtil.closeStatement(ps);
            DBUtil.closeResultSet(rs);
            return mobile;
     }
    
}
