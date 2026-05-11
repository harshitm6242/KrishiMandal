/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.servlet;

import in.krishimandal.dao.impl.JobDAOImpl;
import in.krishimandal.dao.impl.ProductDAOImpl;
import in.krishimandal.dao.impl.RentingDAOImpl;
import in.krishimandal.pojo.JobPojo;
import in.krishimandal.pojo.ProductsPojo;
import in.krishimandal.pojo.RentingProductsPojo;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import static java.lang.System.out;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author mishr
 */
public class LandCollabServlet extends HttpServlet {

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
            if ("/LandCollabServlet".equals(path)) {
                handleJobs(jsonRequest, response, out);
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
    private void handleJobs(JSONObject jsonRequest, HttpServletResponse response, PrintWriter out) {
        try{
            String user=jsonRequest.optString("user","");
            String area=jsonRequest.optString("area","");
            String KHARSA=jsonRequest.optString("kharsa","");
            String location=jsonRequest.optString("location","");
            String dispute=jsonRequest.optString("dispute","");
            String purpose=jsonRequest.optString("purpose","");
            int duration=Integer.parseInt(jsonRequest.optString("duration",""));
            String state=jsonRequest.optString("state","");
            String district=jsonRequest.optString("district","");
            
            String status="";
//            JobDAOImpl jobdao=new JobDAOImpl();  
//            List<JobPojo> joblist=new ArrayList<>();
//            JSONArray jobArray = new JSONArray();
//            joblist=jobdao.searchJobs();
           JSONObject jsonResponse = new JSONObject();
//            for (JobPojo job : joblist) {
//                    JSONObject jobJson = new JSONObject();
//                    jobJson.put("title",job.getTitle() );               
//                    jobJson.put("employer", job.getEmployer());
//                    jobJson.put("description", job.getDescription());
//                    String Salary=Double.toString(job.getSalary());
//                    jobJson.put("salary",Salary );
//                    jobArray.put(jobJson);
//                }
//               
//                    
//                    String title = jsonRequest.optString("title", "");
//                    String description = jsonRequest.optString("description", "");
//                    String location=jsonRequest.optString("location","");
//                    String employer = jsonRequest.optString("employer","");
//                    double salary = Double.parseDouble(jsonRequest.optString("salary",""));
//                    String mobile=jsonRequest.optString("user", "");
//                    String status="";
//                    JobPojo jobs=new JobPojo();
//          
//                    jobs.setTitle(title);
//                    jobs.setMobile(mobile);
//                    jobs.setEmployer(employer);
//                    jobs.setLocation(location);
//                    jobs.setDescription(description);
//                    jobs.setSalary(salary);
//        
//                    status=jobdao.addJob(jobs);
//                    
//                    
//           if(!joblist.isEmpty()){
//                    response.setStatus(HttpServletResponse.SC_OK);
//                    jsonResponse.put("message", "Job Order");
//                    jsonResponse.put("jobs", jobArray);
//            }else{
//                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                    jsonResponse.put("message", "Error in Fetching Jobs");
//            }  
            if (status.equalsIgnoreCase("Job Registration Failed") ) {
                   response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                   jsonResponse.put("message", status);
            }else if(status.equalsIgnoreCase("Renting Product Registration Failed")){
                  response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                  jsonResponse.put("message", status);
            }
           else {
                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.put("message", district);
            
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
