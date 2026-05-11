/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.servlet;

import in.krishimandal.dao.impl.ProductDAOImpl;
import in.krishimandal.dao.impl.RentingDAOImpl;
import in.krishimandal.pojo.ProductsPojo;
import in.krishimandal.pojo.RentingProductsPojo;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Base64;
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
public class ProductsListServlet extends HttpServlet {

    
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
            if ("/ProductsListServlet".equals(path)) {
                productList(jsonRequest, response, out);
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
    private void productList(JSONObject jsonRequest, HttpServletResponse response, PrintWriter out) {
        try{
        String sellcategory = jsonRequest.optString("sellcategory", "");
        String rentcategory= jsonRequest.optString("rentcategory", "");
        String search=jsonRequest.optString("productName", "");
        ProductDAOImpl productdao=new ProductDAOImpl();
        RentingDAOImpl rentdao=new RentingDAOImpl();
        
        JSONArray productArray = new JSONArray();
        JSONArray productArray1= new JSONArray();
        List<RentingProductsPojo> list1=null;
        List<ProductsPojo> list2=new ArrayList<>();
        List<RentingProductsPojo> list3=null;
        List<ProductsPojo> list4=new ArrayList<>();
        list2=productdao.getAllProductsByType(sellcategory);
        list4=productdao.searchAllProducts(search);
        //String name=list.get(0).getProductName();
        byte[] imageBytes=null;
         for (ProductsPojo product : list2) {
                JSONObject productJson = new JSONObject();
                productJson.put("name", product.getProductName());
                String p=Double.toString(product.getAmount());
                productJson.put("price", p);
                productJson.put("description", product.getProductInfo());
                productJson.put("quantity", product.getQuantity());
                productJson.put("prodid",product.getProductId());
                productJson.put("user",product.getMobile());
               
               imageBytes = convertInputStreamToByteArray(product.getImage());
               // byte[] imageBytes = product.getImage();
              if (imageBytes.length!=0 ) {
                String base64Image = Base64.getEncoder().encodeToString(imageBytes);
                productJson.put("image",base64Image);
            } else {
                productJson.put("image", JSONObject.NULL);
            }
                productArray.put(productJson);
            }
         
         for (ProductsPojo product : list4) {
                JSONObject productJson1= new JSONObject();
                productJson1.put("name", product.getProductName());
                String p=Double.toString(product.getAmount());
                productJson1.put("price", p);
                productJson1.put("description", product.getProductInfo());
                productJson1.put("quantity", product.getQuantity());
                productJson1.put("prodid",product.getProductId());
                productJson1.put("user",product.getMobile());
             
                productArray1.put(productJson1);
            }
        
            
        JSONObject jsonResponse = new JSONObject();
        response.setStatus(HttpServletResponse.SC_OK);
        jsonResponse.put("message", sellcategory);
        jsonResponse.put("products", productArray);
        jsonResponse.put("searchproducts", productArray1);
        
        //response.getWriter().write(jsonResponse.toString());
        if (list2.isEmpty()) {
            //response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        JSONArray productArray2 = new JSONArray();
        list1=new ArrayList<>();
        
        list1=rentdao.getAllRentingProductsByType(rentcategory);
         for (RentingProductsPojo product : list1) {
                JSONObject productJson = new JSONObject();
                productJson.put("name", product.getProductName());
                String amount=Double.toString(product.getProductPrice())+"/day";
                productJson.put("price", amount);
                productJson.put("description", product.getProductInfo());
                productJson.put("quantity", product.getQuantity());
                String time=Integer.toString(product.getRentingtime())+"/day";
                productJson.put("duration",time);
                productJson.put("user", product.getMobile());
                productArray.put(productJson);
            }
            jsonResponse.put("message","ProductListServlet");

             } else {
                response.setStatus(HttpServletResponse.SC_OK);
                 //jsonResponse.put("message",category);
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
    public static byte[] convertInputStreamToByteArray(InputStream inputStream) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[4096];  // Buffer size (4KB)
        int bytesRead;

        // Read the InputStream in chunks and write to ByteArrayOutputStream
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            byteArrayOutputStream.write(buffer, 0, bytesRead);
        }

        // Return the byte array
        return byteArrayOutputStream.toByteArray();
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
