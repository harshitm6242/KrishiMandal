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
public class UserPojo {

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
    
    private String userMobile;
    private String userName;
    private int age;
    private String address;
    private String email;
    private Date dob;
    private String pincode;
    private String state;
    private String district;
    private String password;
    public String gender;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    private Date registrationDate;

    public UserPojo() {
    }

    public UserPojo(String password,String userMobile, String userName, int age, String address, String email, Date dob, String pincode, String state, String district, Date registrationDate) {
        this.userMobile = userMobile;
        this.userName = userName;
        this.age = age;
        this.address = address;
        this.email = email;
        this.dob = dob;
        this.pincode = pincode;
        this.state = state;
        this.district = district;
        this.registrationDate = registrationDate;
        this.password=password;
    }
   
    
    

    public String getUserMobile() {
        return userMobile;
    }

    public void setUserMobile(String userMobile) {
        this.userMobile = userMobile;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }
    public String toString() {
        return "Users{" +
                "userMobile='" + userMobile + 
                ", userName='" + userName + 
                ", age=" + age +
                ", address='" + address +
                ", email='" + email + 
                ", dob=" + dob +
                ", pincode='" + pincode +
                ", state='" + state +
                ", district='" + district + 
                ", registrationDate=" + registrationDate +
                '}';
    }
   
}
