/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.servlet;
//USE NHI KIYA HAI ISKI JAGAH SERVLET>JAVA FILE USE HUI HAI
import in.krishimandal.dao.impl.ProductDAOImpl;
import in.krishimandal.dao.impl.RentingDAOImpl;
import in.krishimandal.pojo.ProductsPojo;
import in.krishimandal.pojo.RentingProductsPojo;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author mishr
 */
@MultipartConfig
public class ProductsServlet extends HttpServlet {

    
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
            if ("/ProductsServlet".equals(path)) {
                handleProducts(jsonRequest, response, out,request);
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
    private void handleProducts(JSONObject jsonRequest, HttpServletResponse response, PrintWriter out,HttpServletRequest request) {
        try{
        String itemName = jsonRequest.optString("itemName", "");
        String description = jsonRequest.optString("description", "");
        int quantity=Integer.parseInt(jsonRequest.optString("quantity",""));
        String productCategory = jsonRequest.optString("productCategory");
        double price = Double.parseDouble(jsonRequest.optString("price"));
        boolean isRent = Boolean.parseBoolean(jsonRequest.optString("isRent"));
        
       byte[] imageBytes = (byte[]) request.getAttribute("imageBytes");
        
        String status="";
        if(!isRent){
        ProductsPojo prod=new ProductsPojo();
        prod.setProductName(itemName);
        prod.setProductInfo(description);
        prod.setProductCategory(productCategory);
        prod.setQuantity(quantity);
        prod.setAmount(price);
        //prod.setProductImage(imageBytes);
        ProductDAOImpl product=new ProductDAOImpl();
        status=product.addProduct(prod);
        }else if(isRent){
            int duration = Integer.parseInt(jsonRequest.optString("duration"));
            RentingProductsPojo rent=new RentingProductsPojo(); 
            rent.setProductName(itemName);
            rent.setProductInfo(description);
            rent.setQuantity(quantity);
            rent.setProductPrice(price);
            rent.setCategory(productCategory);
            rent.setRentingtime(duration);
            RentingDAOImpl rentDao=new RentingDAOImpl();
            status=rentDao.addRentingProduct(rent);
        }
 
        JSONObject jsonResponse = new JSONObject();
        if (status.equalsIgnoreCase("Product Registration Failed") ) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            jsonResponse.put("message", status);
            response.getWriter().write(status);
             }else if(status.equalsIgnoreCase("Renting Product Registration Failed")){
                  response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
               jsonResponse.put("message", status);
               response.getWriter().write(status);
             }
           else {
                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.put("message", status);
                response.getWriter().write(status);
            
        } response.setContentType("application/json");
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
