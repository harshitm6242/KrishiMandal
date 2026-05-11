/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.dao;

import in.krishimandal.pojo.ApplicantPojo;
import in.krishimandal.pojo.JobPojo;
import java.util.List;

/**
 *
 * @author mishr
 */
public interface JobDao {
 
    public String addJob(JobPojo job);
    
    public String updateJob(JobPojo job);
    
    public String removeJob(String jobId);
    
    public List<JobPojo> searchJobs();
    
    public List<JobPojo> myjobs(String usermobile);
    
    public List<JobPojo> getJobsByEmployer(String mobile);
    
    public boolean addJobApplication(ApplicantPojo apply);
    
    
   // public List<JobPojo> getJobsByLocation(String location);
    //public String updateJobStatus(String jobId, String status);
    
    // Job Application related methods
    //public String addJobApplication(JobApplicationPojo application);
   // public List<JobApplicationPojo> getApplicationsByJobId(String jobId);
}


