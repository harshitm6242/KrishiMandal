/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.dao.impl;

import in.krishimandal.dao.JobDao;
import in.krishimandal.pojo.ApplicantPojo;
import in.krishimandal.pojo.JobPojo;
import in.krishimandal.utility.DBUtil;
import in.krishimandal.utility.IDUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author mishr
 */
public class JobDAOImpl implements JobDao{
    
    @Override
    public String addJob(JobPojo job) {
        String status = "Job Registration Failed";
        if (job.getJobId() == null) {
            job.setJobId(IDUtil.generateJobId());
        }
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        try {
            ps = conn.prepareStatement("INSERT INTO Job (jobid, title, employer, description, location, salary,status,createdby) VALUES (?,?,?,?,?,?,?,?)");
            
            ps.setString(1, job.getJobId());
            ps.setString(2, job.getTitle());
            ps.setString(3, job.getEmployer());
            ps.setString(4, job.getDescription());
            ps.setString(5, job.getLocation());
            ps.setDouble(6, job.getSalary());
            ps.setString(7, "Open");
            ps.setString(8, job.getMobile());
            int count = ps.executeUpdate();
            if (count == 1) {
                status = "Job Added Successfully";
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in addJob method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeStatement(ps);
        }
        return status;
    }

    @Override
    public String updateJob(JobPojo job) {
        String status = "Job Update Failed";
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        
        try {
            ps = conn.prepareStatement("UPDATE Job SET title=?, employer=?, description=?, location=?, salary=?, status=? WHERE jobid=?");
            
            ps.setString(1, job.getTitle());
            ps.setString(2, job.getEmployer());
            ps.setString(3, job.getDescription());
            ps.setString(4, job.getLocation());
            ps.setDouble(5, job.getSalary());
            ps.setString(6, job.getStatus());
            ps.setString(7, job.getJobId());
            
            int count = ps.executeUpdate();
            if (count == 1) {
                status = "Job Updated Successfully";
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in updateJob method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeStatement(ps);
        }
        return status;
    }

    @Override
    public String removeJob(String jobId) {
        String status = "Job Removal Failed";
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps1 = null;
        PreparedStatement ps2 = null;
        
        try {
            // First update job status to Closed
            ps1 = conn.prepareStatement("UPDATE Job SET status='Closed' WHERE jobid=?");
            ps1.setString(1, jobId);
            int update = ps1.executeUpdate();
            
            if (update == 1) {
                // Then update all pending applications to Cancelled
                ps2 = conn.prepareStatement("UPDATE Job_Application SET status='Cancelled' WHERE jobid=? AND status='Pending'");
                ps2.setString(1, jobId);
                ps2.executeUpdate();
                status = "Job Removed Successfully";
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in removeJob method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeStatement(ps1);
            DBUtil.closeStatement(ps2);
        }
        return status;
    }

    @Override
    public List<JobPojo> searchJobs() {
        List<JobPojo> jobs = new ArrayList<>();
        Connection conn = DBUtil.provideConnection();
        Statement st = null;
        ResultSet rs = null;
        try {
            st=conn.createStatement();
            rs = st.executeQuery("SELECT * FROM Job " );
            while (rs.next()) {
               JobPojo job=new JobPojo();
               job.setJobId(rs.getString("jobid"));
               job.setTitle(rs.getString("title"));
               job.setEmployer(rs.getString("employer"));
               job.setLocation(rs.getString("location"));
               job.setSalary(rs.getInt("salary"));
               job.setDescription(rs.getString("description"));
               job.setStatus(rs.getString("status"));
               job.setCreatedBy(rs.getString("createdby"));
               jobs.add(job);
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in searchJobs method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closeStatement(st);
        }
        return jobs;
    }
    
    public List<JobPojo> myjobs(String usermobile){
        List<JobPojo> jobs = new ArrayList<>();
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps=conn.prepareStatement("SELECT * FROM Job where createdby=?");
            ps.setString(1,usermobile);
            rs = ps.executeQuery();
            while (rs.next()) {
               JobPojo job=new JobPojo();
               job.setJobId(rs.getString("jobid"));
               job.setTitle(rs.getString("title"));
               job.setEmployer(rs.getString("employer"));
               job.setLocation(rs.getString("location"));
               job.setSalary(rs.getInt("salary"));
               job.setDescription(rs.getString("description"));
               job.setStatus(rs.getString("status"));
               job.setCreatedAt(rs.getDate("createdate"));
               jobs.add(job);
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in searchJobs method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closeStatement(ps);
        }
        return jobs;
    }

    @Override
    public List<JobPojo> getJobsByEmployer(String usermobile) {
        List<JobPojo> jobs = new ArrayList<>();
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        
        try {
            ps = conn.prepareStatement("SELECT j.jobid, j.title, j.employer, j.description, j.location, j.salary, j.createdate,j.status,ja.applicantname FROM Job j INNER JOIN JobApplication ja ON j.jobid = ja.jobid WHERE ja.applicantid = ?");
            ps.setString(1, usermobile);
            rs = ps.executeQuery();
            while (rs.next()) {
               JobPojo job=new JobPojo();
               job.setJobId(rs.getString("jobid"));
               job.setTitle(rs.getString("title"));
               System.out.println(rs.getString("title"));
               job.setEmployer(rs.getString("employer"));
               job.setDescription(rs.getString("description"));
               job.setLocation(rs.getString("location"));
               job.setSalary(rs.getDouble("salary"));
               job.setCreatedAt(rs.getDate("createdate"));
               job.setStatus(rs.getString("status"));
               job.setApplicantname(rs.getString("applicantname"));
               jobs.add(job);   
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in getJobsByEmployer method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closeStatement(ps);
        }
        return jobs;
    }
    
    public List<ApplicantPojo> getEmployer(String jobid) {
        List<ApplicantPojo> jobs = new ArrayList<>();
        Connection conn = DBUtil.provideConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        
        try {
            ps = conn.prepareStatement("SELECT * FROM JobApplication WHERE jobid=?");
            ps.setString(1, jobid);
            
            rs = ps.executeQuery();
            while (rs.next()) {
                 ApplicantPojo job=new ApplicantPojo();
                 job.setJobId(rs.getString("jobid"));
               job.setApplicantname(rs.getString("applicantname"));
               job.setEmail(rs.getString("email"));
               job.setGender(rs.getString("gender"));
               job.setAddress(rs.getString("address"));
               job.setMessage(rs.getString("message"));
               job.setOccupation(rs.getString("occupation"));
               job.setStatus(rs.getString("status"));
               job.setAppliedDate(rs.getDate("appliedAt"));
               job.setContactNumber(rs.getLong("contactnumber"));
               jobs.add(job);
            }
        } catch (SQLException ex) {
            System.out.println("Exception occurred in getJobsByEmployer method: " + ex);
            ex.printStackTrace();
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closeStatement(ps);
        }
        return jobs;
    }
    
    public boolean addJobApplication(ApplicantPojo apply){
            boolean status = false;
            Connection conn = DBUtil.provideConnection();
             PreparedStatement ps = null;
    
         if (apply.getApplicationId() == null) {
                    apply.setApplicationId(IDUtil.generateApplicationId());           }
    try {
        ps = conn.prepareStatement("INSERT INTO JobApplication (applicationid,jobid,applicantid,applicantname, email, gender, address, occupation, message, contactnumber, appliedAt, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
        
        ps.setString(1, apply.getApplicationId());
        ps.setString(2, apply.getJobId());
        ps.setString(3, apply.getApplicantId());
        ps.setString(4, apply.getApplicantname());
        ps.setString(5, apply.getEmail());
        ps.setString(6, apply.getGender());
        ps.setString(7, apply.getAddress());
        ps.setString(8, apply.getOccupation());
        ps.setString(9, apply.getMessage());
        ps.setLong(10, apply.getContactNumber());
       
        java.util.Date today = new java.util.Date();
        java.sql.Date appliedDate = new java.sql.Date(today.getTime());
        ps.setDate(11, appliedDate);
        ps.setString(12, "Pending"); 
        
        int count = ps.executeUpdate();
        status = count > 0;
    } catch (SQLException ex) {
        System.out.println("Exception in addJobApplication(): " + ex);
        ex.printStackTrace();
    } finally {
        DBUtil.closeStatement(ps);
    }
    
    return status;
    }
}
