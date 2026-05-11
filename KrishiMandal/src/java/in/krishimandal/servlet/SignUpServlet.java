/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.servlet;

import in.krishimandal.dao.impl.UserDAOImpl;
import in.krishimandal.pojo.UserPojo;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author mishr
 */
public class SignUpServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
       response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
       response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
       response.setHeader("Access-Control-Allow-Credentials", "true");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            String path = request.getServletPath();
            StringBuilder stringBuilder = new StringBuilder();

            try (BufferedReader reader = request.getReader()) {
                String line;
                while ((line = reader.readLine()) != null) {
                    stringBuilder.append(line);
                }
            }
            JSONObject jsonRequest = new JSONObject(stringBuilder.toString());

            response.setContentType("application/json");
            PrintWriter out = response.getWriter();

            // Check for the correct endpoint
            if ("/SignUpServlet".equals(path)) {
                handleSignUp(jsonRequest, response, out);
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("message", "Invalid endpoint.");
                out.print(jsonResponse);
            }

            out.flush();
        } catch (JSONException ex) {
            Logger.getLogger(LoginServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        }
    private void handleSignUp(JSONObject jsonRequest, HttpServletResponse response, PrintWriter out) {
        try {
        String mobileNumber = jsonRequest.optString("mobileNumber", "");
        String password = jsonRequest.optString("password", "");
        String otp = jsonRequest.optString("otp", "");
        String email=jsonRequest.optString("email","");
        String name=jsonRequest.optString("name","");
        
        UserPojo userPojo=new UserPojo();
        userPojo.setUserMobile(mobileNumber);
        userPojo.setPassword(password);
        userPojo.setEmail(email);
        userPojo.setUserName(name);
        
        JSONObject jsonResponse = new JSONObject();
        UserDAOImpl user=new UserDAOImpl();
        String status=user.registerUser(userPojo);
//        
//        PreparedStatement ps=null;
//        ResultSet rs=null;
//        Connection conn=DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521/xe","krishimandal","sih");
//        String status="Login Denied: Invalid username password";
//        try{
//            ps=conn.prepareStatement("select email from users where usermobile=? and password=?");
//            ps.setString(1, mobileNumber);
//            ps.setString(2, password);
//            rs=ps.executeQuery();
//            if(rs.next()){
//                status=rs.getString("email");
//            }
//        }catch(SQLException ex){
//            status="Error"+ex.getMessage();
//            System.out.println("Exception in isValidCredentails():"+ex);
//            ex.printStackTrace();
//        }
//        DBUtil.closeResultSet(rs);
//        DBUtil.closeStatement(ps);
        if (status.equalsIgnoreCase("Registration Failed")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
           // jsonResponse.put("message", status);
            response.getWriter().write(status);
        } else if (!otp.isEmpty()) {
            // Handle OTP login
            if (otp.equals("123456")) {
                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.put("message", "Login successful with OTP!");
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                jsonResponse.put("message", "Invalid OTP.");
            }
        }else if(status.equalsIgnoreCase("Mobile No. Already Registered")){
             response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);       
            // jsonResponse.put("message", "Mobile No. Already Registered");  
             response.getWriter().write("Mobile No. Already Registered");
        } else {
                response.setStatus(HttpServletResponse.SC_OK);
                //jsonResponse.put("message", "Registered Successfully");
             response.getWriter().write("Registered Successfully");
        } 

        // Ensure that the response content is set to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Write the response to the output stream
       // out.print(jsonResponse.toString());
        out.flush();  // Make sure to flush the output stream to send the response
    } catch (Exception e) {
        // Handle any exceptions and send a server error response
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        JSONObject errorResponse = new JSONObject();
        try {
            errorResponse.put("message", "Server error occurred.");
            out.print(errorResponse.toString());
        } catch (JSONException ex) {
            Logger.getLogger(LoginServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        out.flush();
      }
    }
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setStatus(HttpServletResponse.SC_OK);
}

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
