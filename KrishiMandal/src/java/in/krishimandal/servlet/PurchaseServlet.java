/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.servlet;

import in.krishimandal.dao.impl.OrderDAOImpl;
import in.krishimandal.pojo.OrderDetailsPojo;
import in.krishimandal.pojo.RentalDetailsPojo;
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
public class PurchaseServlet extends HttpServlet {

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
            if ("/PurchaseServlet".equals(path)) {
                handlePurchase(jsonRequest, response, out);
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
    
    private void handlePurchase(JSONObject jsonRequest, HttpServletResponse response, PrintWriter out) {
        try{
                    JSONObject jsonResponse = new JSONObject();
                    
                    OrderDetailsPojo order=new OrderDetailsPojo();
                    OrderDAOImpl orderdao=new OrderDAOImpl();
                    
                    RentalDetailsPojo rent=new RentalDetailsPojo();
                    String name = jsonRequest.optString("name", "");
                    String address = jsonRequest.optString("address", "");
                    String email=jsonRequest.optString("email","");
                    int duration =Integer.parseInt(jsonRequest.optString("duration",""));
                    String paymentMode = jsonRequest.optString("paymentMode","");
                    Long contactno=Long.parseLong(jsonRequest.optString("contactNumber",""));
                    double amount = Double.parseDouble(jsonRequest.optString("totalAmount",""));
                    int quantity =Integer.parseInt(jsonRequest.optString("quantity","")); 
                    String userid=jsonRequest.optString("user","");
                    boolean status=false;
                    System.out.println(userid);
                   // usermobile, productid
                   if(duration==0){
                   order.setUserName(name);
                   order.setEmail(email);
                   order.setUserMobile(userid);
                   order.setLocation(address);
                   order.setContactNo(contactno);
                   order.setQuantity(quantity);
                   order.setOrderAmount(amount);
                   order.setPaymentMode(paymentMode);
                   status=orderdao.addOrder(order);
                   }  else{
                       rent.setName(name);
                       rent.setEmail(email);
                       rent.setMobile(userid);
                       rent.setAddress(address);
                       rent.setUpimode(paymentMode);
                       rent.setAmount(amount);
                       rent.setContact(contactno);
                       rent.setQuantity(quantity);
                       rent.setDuration(duration);
                       status=orderdao.addRentingOrder(rent);
                   }
            if (!status ) {
                   response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                   jsonResponse.put("message","Order Submission Failed!" );
            }else {
                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.put("message", "order Successfully Placed!");
            
        } response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Write the response to the output stream
        out.print(jsonResponse.toString());
        out.flush();
           // Make sure to flush the output stream to send the response
        }catch (Exception e) {
        // Handle any exceptions and send a server error response
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        JSONObject errorResponse = new JSONObject();
        try {
            errorResponse.put("message", "Input Valid Data");
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
