/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.servlet;

import in.krishimandal.dao.impl.JobDAOImpl;
import in.krishimandal.dao.impl.UserDAOImpl;
import in.krishimandal.pojo.JobPojo;
import in.krishimandal.pojo.UserPojo;
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
public class JobServlet extends HttpServlet {

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

            if (!"/JobServlet".equals(path)) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("message", "Invalid endpoint.");
                out.print(jsonResponse.toString());
                out.flush();
                return;
            }

            if ("POST".equalsIgnoreCase(request.getMethod())) {
                StringBuilder stringBuilder = new StringBuilder();
                try (BufferedReader reader = request.getReader()) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        stringBuilder.append(line);
                    }
                }
                JSONObject jsonRequest = new JSONObject(stringBuilder.toString());
                handleAddJob(jsonRequest, response, out);
                return;
            }

            handleJobs(response, out);

            out.flush();
        } catch (JSONException ex) {
            Logger.getLogger(LoginServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void handleAddJob(JSONObject jsonRequest, HttpServletResponse response, PrintWriter out) {
        try {
            String title = jsonRequest.optString("title", "").trim();
            String description = jsonRequest.optString("description", "").trim();
            String location = jsonRequest.optString("location", "").trim();
            String employer = jsonRequest.optString("employer", "").trim();
            String salaryValue = jsonRequest.optString("salary", "").trim();
            String userIdentifier = jsonRequest.optString("user", "").trim();

            if (title.isEmpty() || description.isEmpty() || location.isEmpty() || employer.isEmpty() || salaryValue.isEmpty() || userIdentifier.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("message", "All fields are required.");
                out.print(jsonResponse.toString());
                out.flush();
                return;
            }

            double salary = Double.parseDouble(salaryValue);
            UserDAOImpl userDAO = new UserDAOImpl();
            UserPojo userPojo = userDAO.getUserDetails(userIdentifier);
            if (userPojo == null || userPojo.getUserMobile() == null || userPojo.getUserMobile().trim().isEmpty()) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("message", "Please log in again before posting a job.");
                out.print(jsonResponse.toString());
                out.flush();
                return;
            }

            JobPojo jobs = new JobPojo();
            jobs.setTitle(title);
            jobs.setEmployer(employer);
            jobs.setLocation(location);
            jobs.setDescription(description);
            jobs.setSalary(salary);
            jobs.setMobile(userPojo.getUserMobile());
            jobs.setCreatedBy(userPojo.getUserMobile());

            JobDAOImpl jobdao = new JobDAOImpl();
            String status = jobdao.addJob(jobs);

            JSONObject jsonResponse = new JSONObject();
            if ("Job Added Successfully".equalsIgnoreCase(status)) {
                response.setStatus(HttpServletResponse.SC_OK);
            } else if ("Database Unavailable".equalsIgnoreCase(status)) {
                response.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
            jsonResponse.put("message", status);
            out.print(jsonResponse.toString());
            out.flush();
        } catch (NumberFormatException ex) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            JSONObject jsonResponse = new JSONObject();
            try {
                jsonResponse.put("message", "Salary must be a number.");
                out.print(jsonResponse.toString());
            } catch (JSONException ignored) {
            }
            out.flush();
        } catch (Exception ex) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            JSONObject errorResponse = new JSONObject();
            try {
                errorResponse.put("message", "Server error occurred.");
                out.print(errorResponse.toString());
            } catch (JSONException ignored) {
            }
            out.flush();
        }
    }

    private void handleJobs(HttpServletResponse response, PrintWriter out) {
        try {
            JobDAOImpl jobdao = new JobDAOImpl();
            List<JobPojo> joblist = jobdao.searchJobs();
            JSONArray jobArray = new JSONArray();
            JSONObject jsonResponse = new JSONObject();

            for (JobPojo job : joblist) {
                JSONObject jobJson = new JSONObject();
                jobJson.put("title", job.getTitle());
                jobJson.put("employer", job.getEmployer());
                jobJson.put("description", job.getDescription());
                jobJson.put("salary", Double.toString(job.getSalary()));
                jobArray.put(jobJson);
            }

            response.setStatus(HttpServletResponse.SC_OK);
            jsonResponse.put("message", "Job Order");
            jsonResponse.put("jobs", jobArray);
            out.print(jsonResponse.toString());
            out.flush();
        } catch (Exception ex) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            JSONObject errorResponse = new JSONObject();
            try {
                errorResponse.put("message", "Server error occurred.");
                out.print(errorResponse.toString());
            } catch (JSONException ignored) {
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
