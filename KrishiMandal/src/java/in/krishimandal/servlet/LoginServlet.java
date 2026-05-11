/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.servlet;

import in.krishimandal.dao.impl.UserDAOImpl;
import in.krishimandal.pojo.UserPojo;
import in.krishimandal.utility.MailMessage;
import java.io.BufferedReader;
import org.json.JSONObject;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.mail.MessagingException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;


/**
 *
 * @author mishr
 */
public class LoginServlet extends HttpServlet {
   
    //private final String generatedOtp = "123456";
    
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
            if ("/LoginServlet".equals(path)) {
                handleLogin(jsonRequest, response, out,request);
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

    private void handleLogin(JSONObject jsonRequest, HttpServletResponse response, PrintWriter out,HttpServletRequest request) {
        try {
        String mobileNumber = jsonRequest.optString("mobileNumber", "");
        String password = jsonRequest.optString("password");
        int otp=0;
       //int otp=Integer.parseInt(jsonRequest.optString("otp",""));
        String flag=jsonRequest.optString("useOtp");
        boolean isRent=Boolean.parseBoolean(flag+otp);
        //int otp =Integer.parseInt( jsonRequest.optString("otp"));
            System.out.println(isRent+"ha");
        int generatedOtp=0;
        if(isRent){
            generatedOtp=handleotp(mobileNumber);
        }
        System.out.println(isRent+""+otp+generatedOtp);
        JSONObject jsonResponse = new JSONObject();
        UserDAOImpl user=new UserDAOImpl();
        String status=user.isValidCredentails(mobileNumber, password,otp,generatedOtp);
        if (status.equalsIgnoreCase("Login Denied: Invalid username password")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
           // jsonResponse.put("message", "Login Denied: Invalid username password");
            response.getWriter().write("Login Denied: Invalid username password");
        } else if (status.equalsIgnoreCase("Login Successfully")) {
                response.setStatus(HttpServletResponse.SC_OK);
                System.out.println("hii"+generatedOtp+mobileNumber);
                response.getWriter().write("Login successful with OTP!");
                jsonResponse.put("message", "Login successful with OTP!");
            } else if(status.equalsIgnoreCase("Invalid OTP")) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                System.out.println(otp+generatedOtp);
                response.getWriter().write("Invalid OTP.");
                System.out.println("Invalid OTP.");
                jsonResponse.put("message", "Invalid OTP.");
            }
         else {
                response.setStatus(HttpServletResponse.SC_OK);
               // jsonResponse.put("message", "Login successfully");
                response.getWriter().write("Login successfully");
            
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
    @Override
protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setStatus(HttpServletResponse.SC_OK);
}
private int handleotp(String mobile){
    UserDAOImpl userdao=new UserDAOImpl();
    UserPojo user=new UserPojo();
    user=userdao.getUserDetails(mobile);
    String email=user.getEmail();
    System.out.println(email);
    int otp=0;
    try{
        otp=MailMessage.otp(email);
    }catch (MessagingException e) {
            e.printStackTrace();
        }
    return otp;
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
