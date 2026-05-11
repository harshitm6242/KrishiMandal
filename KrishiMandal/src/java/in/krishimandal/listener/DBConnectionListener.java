/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.listener;


import in.krishimandal.utility.DBUtil;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 *
 * @author mishr
 */
public class DBConnectionListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ServletContext ctxt=sce.getServletContext();
        String dburl=ctxt.getInitParameter("url");
        String username=ctxt.getInitParameter("username");
        String password=ctxt.getInitParameter("password");
        DBUtil.openConnection(dburl, username, password);
        
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        DBUtil.closedConnection();
    }
    
   
    
    
}
