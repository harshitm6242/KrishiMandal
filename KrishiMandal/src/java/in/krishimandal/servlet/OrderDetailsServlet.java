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
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author mishr
 */
public class OrderDetailsServlet extends HttpServlet {

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
        response.setContentType("text/html;charset=UTF-8");
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
            if ("/OrderDetailsServlet".equals(path)) {
                orderList(jsonRequest, response, out);
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
    private void orderList(JSONObject jsonRequest, HttpServletResponse response, PrintWriter out) {
        try{
            String usermobile=jsonRequest.optString("userid", "");
        OrderDAOImpl orderdao=new OrderDAOImpl();
        JSONArray productArray1 = new JSONArray();
        JSONArray productArray2 = new JSONArray();
        List<OrderDetailsPojo> list1=new ArrayList<>();
        list1=orderdao.gerAllOrdersDetails(usermobile);
        //String name=list.get(0).getProductName();
       
         for (OrderDetailsPojo order: list1) {
                JSONObject productJson = new JSONObject();
                productJson.put("orderid", order.getOrderId());
                productJson.put("orderdate", order.getOrderDate());
                //String amount=Double.toString(order.getOrderAmount());
                productJson.put("orderamount",order.getOrderAmount());
                String contact=Long.toString(order.getContactNo());
                productJson.put("usermobile", contact);
                productJson.put("username", order.getUserName());
                productJson.put("quantity", order.getQuantity());
                productArray1.put(productJson);
            }
         
         List<RentalDetailsPojo> list2=new ArrayList<>();
         list2=orderdao.getAllRentalOrders(usermobile);
        for (RentalDetailsPojo order: list2) {
                JSONObject productJson = new JSONObject();
                productJson.put("rentalid", order.getRentalId());
                productJson.put("rentdate", order.getRentDate());
                //String amount=Double.toString(order.getOrderAmount());
                productJson.put("totalrentamount",order.getAmount());
                String contact=Long.toString(order.getContact());
                productJson.put("usermobile", contact);
                productJson.put("name", order.getName());
                productJson.put("quantity", order.getQuantity());
                productArray2.put(productJson);
            }
        JSONObject jsonResponse = new JSONObject();
        response.setStatus(HttpServletResponse.SC_OK);
        jsonResponse.put("message", "hello");
        jsonResponse.put("orders", productArray1);
        jsonResponse.put("rentorders", productArray2);
        
        //response.getWriter().write(jsonResponse.toString());
//        else {
//                response.setStatus(HttpServletResponse.SC_OK);
//                 //jsonResponse.put("message",category);
//        }
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Write the response to the output stream
        out.print(jsonResponse.toString());
        out.flush();  // Make sure to flush the output stream to send the response
        }catch (Exception e) {
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
