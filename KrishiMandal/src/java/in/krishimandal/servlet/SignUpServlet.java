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
import java.io.IOException;
import java.io.PrintWriter;
import java.util.stream.Collectors;
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

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        try {
            String path = request.getServletPath();
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();

            // Check for the correct endpoint
            if ("/SignUpServlet".equals(path)) {
                if ("GET".equalsIgnoreCase(request.getMethod())) {
                    response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
                    JSONObject jsonResponse = new JSONObject();
                    jsonResponse.put("message", "Use POST with JSON body for signup requests.");
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
                handleSignUp(jsonRequest, response, out, request);
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
    private void handleSignUp(JSONObject jsonRequest, HttpServletResponse response, PrintWriter out, HttpServletRequest request) {
        try {
            String mobileNumber = jsonRequest.optString("mobileNumber", "");
            String password = jsonRequest.optString("password", "");
            String otp = jsonRequest.optString("otp", "");
            String email = jsonRequest.optString("email", "");
            String name = jsonRequest.optString("name", "");
            boolean useOtp = jsonRequest.optBoolean("useOtp", false);

            JSONObject jsonResponse = new JSONObject();
            UserPojo userPojo = buildUserPojo(mobileNumber, password, email, name);
            UserDAOImpl user = new UserDAOImpl();

            if (useOtp && (otp == null || otp.isEmpty())) {
                int generatedOtp = MailMessage.otp(email);
                request.getSession().setAttribute("otp_" + email, generatedOtp);
                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.put("message", "OTP sent to registered email.");
                String devReturn = System.getenv("DEV_RETURN_OTP");
                if (devReturn != null && devReturn.equalsIgnoreCase("true")) {
                    jsonResponse.put("otp", generatedOtp);
                }
                out.print(jsonResponse.toString());
                out.flush();
                return;
            }

            if (useOtp && otp != null && !otp.isEmpty()) {
                Object stored = request.getSession().getAttribute("otp_" + email);
                int storedOtp = stored instanceof Integer ? (Integer) stored : -1;
                if (storedOtp != -1 && Integer.toString(storedOtp).equals(otp)) {
                    String validationError = validateRequiredFields(userPojo);
                    if (validationError != null) {
                        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        out.write(validationError);
                        out.flush();
                        return;
                    }

                    String regStatus = user.registerUser(userPojo);
                    if (regStatus.equalsIgnoreCase("Registration Successful")) {
                        response.setStatus(HttpServletResponse.SC_OK);
                        out.write("Registered Successfully");
                        request.getSession().removeAttribute("otp_" + email);
                    } else if (regStatus.equalsIgnoreCase("Email Already Registered")) {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        out.write("Email Already Registered");
                    } else if (regStatus.equalsIgnoreCase("Database Unavailable")) {
                        response.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
                        out.write("Database is unavailable. Start Oracle XE and try again.");
                    } else {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        out.write(regStatus);
                    }
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

            String validationError = validateRequiredFields(userPojo);
            if (validationError != null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write(validationError);
                out.flush();
                return;
            }

            String status = user.registerUser(userPojo);
            if (status.equalsIgnoreCase("Database Unavailable")) {
                response.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
                response.getWriter().write("Database is unavailable. Start Oracle XE and try again.");
            } else if (status.equalsIgnoreCase("Registration Successful")) {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("Registered Successfully");
            } else if (status.equalsIgnoreCase("Email Already Registered")) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Email Already Registered");
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write(status);
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

    private UserPojo buildUserPojo(String mobileNumber, String password, String email, String name) {
        UserPojo userPojo = new UserPojo();
        userPojo.setUserMobile(mobileNumber != null ? mobileNumber.trim() : "");
        userPojo.setPassword(password != null ? password.trim() : "");
        userPojo.setEmail(email != null ? email.trim() : "");
        userPojo.setUserName(name != null ? name.trim() : "");
        return userPojo;
    }

    private String validateRequiredFields(UserPojo userPojo) {
        if (userPojo.getUserMobile() == null || userPojo.getUserMobile().trim().isEmpty()) {
            return "Mobile number is required.";
        }
        if (userPojo.getEmail() == null || userPojo.getEmail().trim().isEmpty()) {
            return "Email is required.";
        }
        if (userPojo.getUserName() == null || userPojo.getUserName().trim().isEmpty()) {
            return "Name is required.";
        }
        if (userPojo.getPassword() == null || userPojo.getPassword().trim().isEmpty()) {
            return "Password is required.";
        }
        return null;
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
