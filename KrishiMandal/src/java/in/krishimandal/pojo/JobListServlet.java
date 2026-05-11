/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.pojo;

import in.krishimandal.dao.impl.JobDAOImpl;
import in.krishimandal.servlet.LoginServlet;
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
public class JobListServlet extends HttpServlet {

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
            if ("/JobListServlet".equals(path)) {
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
            String mobile=jsonRequest.optString("user", "");
            
            JobDAOImpl jobdao=new JobDAOImpl();  
            //System.out.println(jobid);
            List<JobPojo> joblist=new ArrayList<>();
            List<ApplicantPojo> applicant=new ArrayList<>();
            List<JobPojo>list1=new ArrayList<>();
            JSONArray jobArray = new JSONArray();
            joblist=jobdao.searchJobs();
            JSONObject jsonResponse = new JSONObject();
            for (JobPojo job : joblist) {
                    JSONObject jobJson = new JSONObject();
                    jobJson.put("title",job.getTitle() );    
                    jobJson.put("jobid",job.getJobId());
                    jobJson.put("employer", job.getEmployer());
                    jobJson.put("description", job.getDescription());
                    jobJson.put("location",job.getLocation());
                    jobJson.put("user",job.getCreatedBy());
                    String Salary="₹ "+ Double.toString(job.getSalary())+"/Month";
                    jobJson.put("salary",Salary );
                    jobArray.put(jobJson);
                }
            List<JobPojo> job=new ArrayList<>();
                    job=jobdao.myjobs(mobile);
                    System.out.println(mobile);
                    JSONArray jobArray1= new JSONArray();
                    JSONArray jobArray2= new JSONArray();
                    JSONArray jobArray3= new JSONArray();
                    
            String jobid="";
            //JSONObject jsonResponse1 = new JSONObject();
            for (JobPojo x : job) {
                    JSONObject jobJson = new JSONObject();
                    jobid=x.getJobId();
                    jobJson.put("jobid",x.getJobId());
                    jobJson.put("title",x.getTitle() );               
                    jobJson.put("companyName", x.getEmployer());
                    jobJson.put("description", x.getDescription());
                    String Salary=Double.toString(x.getSalary());
                    jobJson.put("Salary",Salary );
                    jobJson.put("location",x.getLocation());
                    jobJson.put("postedDate",x.getCreatedAt());
                    jobArray1.put(jobJson);
                    applicant=jobdao.getEmployer(jobid);
                    System.out.println(jobid);
               for (ApplicantPojo y : applicant) {
                    JSONObject jobJson2 = new JSONObject();
                    jobJson2.put("jobid",y.getJobId());
                    jobJson2.put("name",y.getApplicantname());
                    jobJson2.put("email",y.getEmail());               
                    jobJson2.put("gender",y.getGender());
                    jobJson2.put("address", y.getAddress());
                    jobJson2.put("phone",y.getContactNumber());
                    jobJson2.put("qualifications",y.getOccupation());
                    jobJson2.put("message",y.getMessage());
                    jobJson2.put("postedDate",y.getAppliedDate());
                    jobJson2.put("status", y.getStatus());
                    jobArray2.put(jobJson2);
                    
                  }
                }
            list1=jobdao.getJobsByEmployer(mobile);
            for (JobPojo y : list1) {
                    JSONObject jobJson2 = new JSONObject();
                    jobJson2.put("jobid",y.getJobId());
                    jobJson2.put("title",y.getTitle() );               
                    jobJson2.put("company", y.getEmployer());
                    jobJson2.put("description", y.getDescription());
                    String Salary=Double.toString(y.getSalary());
                    jobJson2.put("salary",Salary );
                    jobJson2.put("location",y.getLocation());
                    jobJson2.put("applicationDate",y.getCreatedAt());
                    jobJson2.put("applicationStatus",y.getStatus());
                    jobJson2.put("name",y.getApplicantname());
                    jobArray3.put(jobJson2);
                    
                  }
            jsonResponse.put("myjobs", jobArray1);
            jsonResponse.put("myapplication", jobArray2);
            jsonResponse.put("application",jobArray3);
               
           if(!joblist.isEmpty()){
                    response.setStatus(HttpServletResponse.SC_OK);
                    jsonResponse.put("message", "JobListServlet");
                    jsonResponse.put("jobs", jobArray);
            }else{
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    jsonResponse.put("message", "Error in Fetching Jobs");
            }  
            
            
         response.setContentType("application/json");
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
