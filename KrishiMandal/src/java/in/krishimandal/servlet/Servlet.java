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
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import static java.lang.System.out;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author mishr
 */
@MultipartConfig
public class Servlet extends HttpServlet {

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
         response.setContentType("text/html;charset=UTF-8");
          response.setContentType("application/json;charset=UTF-8");
         InputStream inputStream=null;
         RequestDispatcher dispatcher = null;
        try {
            PrintWriter out = response.getWriter();
            // Get the image part
            String user=request.getParameter("userid");
            String name=request.getParameter("name");
            String description=request.getParameter("description");
            int quantity=Integer.parseInt(request.getParameter("quantity"));
            String category=request.getParameter("category");
            double price = Double.parseDouble(request.getParameter("price"));
            boolean isRent = Boolean.parseBoolean(request.getParameter("isrent"));
            Part filePart = request.getPart("productImage");
            InputStream imageStream = filePart.getInputStream();
            if (filePart == null) {
                out.println("No file uploaded.");
                return;
            }

            // Check file size
            long fileSize = filePart.getSize();
            if (fileSize == 0) {
                out.println("Uploaded file is empty.");
                return;
            }

            // Log file details
            String fileName = filePart.getSubmittedFileName();
            String fileType = filePart.getContentType();
        System.out.println(user+"hj");
             String status="";
        if(!isRent){
        ProductsPojo prod=new ProductsPojo();
        prod.setProductName(name);
        prod.setProductInfo(description);
        prod.setProductCategory(category);
        prod.setQuantity(quantity);
        prod.setAmount(price);
        prod.setImage(imageStream);
        prod.setMobile(user);
        ProductDAOImpl product=new ProductDAOImpl();
        status=product.addProduct(prod);
        }else if(isRent){
            int duration = Integer.parseInt(request.getParameter("duration"));
            RentingProductsPojo rent=new RentingProductsPojo(); 
            rent.setProductName(name);
            rent.setProductInfo(description);
            rent.setQuantity(quantity);
            rent.setProductPrice(price);
            rent.setCategory(category);
            rent.setRentingtime(duration);
            rent.setMobile(user);
            RentingDAOImpl rentDao=new RentingDAOImpl();
            status=rentDao.addRentingProduct(rent);
        }
//        response.setContentType("application/json");
//        response.setCharacterEncoding("UTF-8");
 
        JSONObject jsonResponse = new JSONObject();
        if (status.equalsIgnoreCase("Product Registration Failed") ) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            jsonResponse.put("message", status);
             }else if(status.equalsIgnoreCase("Renting Product Registration Failed")){
                  response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
               jsonResponse.put("message", status);
             }
           else {
                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.put("message", status);
            
        } 

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
             
             
             
             
             
             
             
//            if(imageBytes.length!=0)  
//                out.println("gfsgsdgds");
//             
//             request.setAttribute("imageBytes", imageBytes);
//             dispatcher = request.getRequestDispatcher("/ProductsServlet");
//            dispatcher.forward(request, response);
            // Forward to the next servlet
//            ProductsPojo product=new ProductsPojo();
//            ProductDAOImpl dao=new ProductDAOImpl();
//            product.setProductImage(imageBytes);
//            product.setImage(inputStream);
//           // String status=dao.images(product);
////             HttpSession session=request.getSession();
//           String mess=dao.images(product,fileSize);
//           String status=dao.processPhoto();
//           out.println(mess);
//           out.println(status);
//             dao.storeImageInSession(session,"image",imageBytes);

      finally {
    // Close inputStream to ensure proper cleanup
    if (inputStream != null) {
        try {
            inputStream.close();
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
    }
    
    
     private byte[] readInputStream(InputStream inputStream) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[4096]; // Buffer size of 4KB
        int bytesRead;

        // Read the input stream into the buffer
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            byteArrayOutputStream.write(buffer, 0, bytesRead);
        }

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
