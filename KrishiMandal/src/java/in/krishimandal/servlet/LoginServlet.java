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
import java.util.stream.Collectors;
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

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        try {
            String path = request.getServletPath();
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();

            // Check for the correct endpoint
            if ("/LoginServlet".equals(path)) {
                if ("GET".equalsIgnoreCase(request.getMethod())) {
                    response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
                    JSONObject jsonResponse = new JSONObject();
                    jsonResponse.put("message", "Use POST with JSON body for login requests.");
                    out.print(jsonResponse.toString());
                    out.flush();
                    return;
                }

                String requestBody;
                try (BufferedReader reader = request.getReader()) {
                    requestBody = reader.lines().collect(Collectors.joining());
                }
                if (requestBody == null || requestBody.trim().isEmpty()) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    JSONObject jsonResponse = new JSONObject();
                    jsonResponse.put("message", "Request body is required.");
                    out.print(jsonResponse.toString());
                    out.flush();
                    return;
                }

                JSONObject jsonRequest = new JSONObject(requestBody);
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
            // Use email as the primary identifier for OTP and login
            String email = jsonRequest.optString("email", "");
            String password = jsonRequest.optString("password", "");
            int otp = jsonRequest.has("otp") ? jsonRequest.optInt("otp", -1) : -1;
            boolean useOtp = jsonRequest.optBoolean("useOtp", false);

            JSONObject jsonResponse = new JSONObject();
            UserDAOImpl user = new UserDAOImpl();

            // If client requested to use OTP but didn't provide otp value, generate and send OTP
            if (useOtp && otp == -1) {
                int generatedOtp = handleotp(email, request);
                // store generated OTP in session for later verification
                request.getSession().setAttribute("otp_" + email, generatedOtp);
                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.put("message", "OTP sent to registered email.");
                // For local/demo use only: optionally return the OTP in the response when DEV_RETURN_OTP=true
                String devReturn = System.getenv("DEV_RETURN_OTP");
                if (devReturn != null && devReturn.equalsIgnoreCase("true")) {
                    jsonResponse.put("otp", generatedOtp);
                }
                out.print(jsonResponse.toString());
                out.flush();
                return;
            }

            // If using OTP for login (otp provided), verify it against session-stored value
            if (useOtp && otp != -1) {
                Object stored = request.getSession().getAttribute("otp_" + email);
                int storedOtp = stored instanceof Integer ? (Integer) stored : -1;
                if (storedOtp != -1 && storedOtp == otp) {
                    response.setStatus(HttpServletResponse.SC_OK);
                    jsonResponse.put("message", "Login successful with OTP!");
                    // Optionally remove OTP after successful verification
                    request.getSession().removeAttribute("otp_" + email);
                    out.print(jsonResponse.toString());
                    out.flush();
                    return;
                } else {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    jsonResponse.put("message", "Invalid OTP.");
                    out.print(jsonResponse.toString());
                    out.flush();
                    return;
                }
            }

            // Default: username/password login
            String status = user.isValidCredentails(email, password, 0, 0);
            if ("Database Unavailable".equalsIgnoreCase(status)) {
                response.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
                jsonResponse.put("message", "Database is unavailable. Start Oracle XE and try again.");
                out.print(jsonResponse.toString());
            } else if (status == null || status.startsWith("Login Denied") || status.startsWith("Error")) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                jsonResponse.put("message", "Login Denied: Invalid username password");
                out.print(jsonResponse.toString());
            } else if (status.equalsIgnoreCase("Login Successfully")) {
                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.put("message", "Login successful");
                out.print(jsonResponse.toString());
            } else {
                // fallback
                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.put("message", "Login successful");
                out.print(jsonResponse.toString());
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
 private int handleotp(String email, HttpServletRequest request){
     UserDAOImpl userdao=new UserDAOImpl();
     UserPojo user=userdao.getUserDetails(email);
     String userEmail = user != null ? user.getEmail() : email;
     if (userEmail == null || userEmail.trim().isEmpty()) {
         return 0;
     }
     System.out.println("Sending OTP to email: " + userEmail);
     int otp=0;
     try{
         otp=MailMessage.otp(userEmail);
         // store otp in session for this email
         request.getSession().setAttribute("otp_" + userEmail, otp);
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
