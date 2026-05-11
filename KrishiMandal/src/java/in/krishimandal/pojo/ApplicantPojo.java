/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.pojo;

import java.util.Date;

/**
 *
 * @author mishr
 */
public class ApplicantPojo {

    public long getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(long contactNumber) {
        this.contactNumber = contactNumber;
    }
    
     private String applicationId;
     private String jobId;
     private String applicantId;
     private String applicantname;
     private String email;
     private String gender;
     private String address;
     private String occupation;
     private String message;
     private long contactNumber;
     private String status;
     private Date appliedDate;

    public ApplicantPojo() {
    }

    public ApplicantPojo(String applicationId, String jobId, String applicantId, String applicantname, String email, String gender, String address, String occupation, String message, String status, Date appliedDate) {
        this.applicationId = applicationId;
        this.jobId = jobId;
        this.applicantId = applicantId;
        this.applicantname = applicantname;
        this.email = email;
        this.gender = gender;
        this.address = address;
        this.occupation = occupation;
        this.message = message;
        this.status = status;
        this.appliedDate = appliedDate;
    }

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getApplicantId() {
        return applicantId;
    }

    public void setApplicantId(String applicantId) {
        this.applicantId = applicantId;
    }

    public String getApplicantname() {
        return applicantname;
    }

    public void setApplicantname(String applicantname) {
        this.applicantname = applicantname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(Date appliedDate) {
        this.appliedDate = appliedDate;
    }
    
}
