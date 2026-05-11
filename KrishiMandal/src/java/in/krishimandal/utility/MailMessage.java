/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.utility;

import java.util.Calendar;
import java.util.Date;
import javax.mail.MessagingException;

/**
 *
 * @author mishr
 */
public class MailMessage {
    public static void registrationSuccess(String recipientMailId, String name) throws MessagingException {
        String subject = "Registration Successfull";
        String htmlTextMessage = "" + "<html>" + "<body>"
                + "<h2 style='color:green;'>Welcome to " + AppInfo.appName + "</h2>" + "" + "Hi " + name + ","
                + "<br><br>Thanks for singing up with " + AppInfo.appName + ".<br>"
                + "We are glad that you choose us. We invite you to check out our latest collection of new electonics appliances."
                + "<br>We are providing upto 60% OFF on most of the electronic gadgets. So please visit our site and explore the collections."
                + "<br><br>Our Online electronics is growing in a larger amount these days and we are in high demand so we thanks all of you for "
                + "making us up to that level. We Deliver Product to your house with no extra delivery charges and we also have collection of most of the"
                + "branded items.<br><br>As a Welcome gift for our New Customers we are providing additional 10% OFF Upto 500 Rs for the first product purchase. "
                + "<br>To avail this offer you only have "
                + "to enter the promo code given below.<br><br><br> PROMO CODE: " + "" + AppInfo.appName.toUpperCase() + "500<br><br><br>"
                + "Have a good day!<br>" + "" + "</body>" + "</html>";
        JavaMailUtil.sendMail(recipientMailId, subject, htmlTextMessage);
    }
    
    public static void orderSuccess(String recipientMailId,String name, String orderNumber,Date orderDate,Double amount) throws MessagingException {
        String subject = "Order Successfully Placed";
//        String img="GadgetHub/web/images/camera.jpg";
        String htmlTextMessage = "" + 
    "<html>" + 
    "<body>" +
        "<h2 style='color:green;'>Order Successfully Placed"  + "</h2>" +
        "Hi " + name + "," +
        "<br><br>Thank you for placing your order with " + AppInfo.appName + "!" +
        "<br>Your order has been successfully placed and is being processed. Below are the details of your order:" +
        "<br><br>" +
        "<strong>Order Number:</strong> " + orderNumber + "<br>" +
        "<strong>Order Date:</strong> " + orderDate + "<br>" +
        "<strong>Total Amount(in Rs):</strong> " + amount + "<br>" +
        "<br>We will notify you as soon as your order is shipped. You can also track your order status on our website." +
        "<br><br>At " + AppInfo.appName + ", we are committed to providing you with the best quality products and services." +
        "<br>If you have any questions or need assistance, feel free to contact our support team." +
        "<br><br>Thank you for choosing us. We look forward to serving you again!" +
        "<br><br><strong>Happy Shopping!</strong><br>" +
        "<br><br>Best regards,<br>" +
        "<strong>The " + AppInfo.appName + " Team</strong>" +
        "<br><br>Developer,<br>"+
        "<strong>Harshit Mishra</strong>"+
//        "<img src='"+img+"'/>"+
    "</body>" + 
    "</html>";

        JavaMailUtil.sendMail(recipientMailId, subject, htmlTextMessage);
    }
    
     public static void orderShipped(String recipientMailId,String name, String orderNumber,Date orderDate,Double amount) throws MessagingException {
        String subject = "Order Shipped";
        Date shippedDate=new java.util.Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(shippedDate);

        // Add days (e.g., 6 or 7)
        int daysToAdd = 9; // Change this to the number of days you want to add
        calendar.add(Calendar.DAY_OF_MONTH, daysToAdd);

        // Get the new date
        Date DeliveryDate = calendar.getTime();
        //System.out.println("New Date: " + DeliveryDate);
        
        String htmlTextMessage = "" + 
    "<html>" + 
    "<body>" +
        "<h2 style='color:green;'>Your Order Has Been Shipped - " + AppInfo.appName + "</h2>" +
        "Hi " + name + "," +
        "<br><br>We are excited to let you know that your order has been shipped and is on its way!" +
        "<br>Here are the details of your shipment:" +
        "<br><br>" +
        "<strong>Order Number:</strong> " + orderNumber + "<br>" +
        "<strong>Order Date:</strong> " + orderDate + "<br>" +
        "<strong>Shipping Date:</strong> " + shippedDate + "<br>" +
        "<strong>Estimated Delivery Date:</strong> " + DeliveryDate +
        "<br><br>Track order on our Website." +
        "<br>Your order is being handled with care and will reach you soon. We hope you're as excited as we are!" +
        "<br><br>If you have any questions or concerns about your shipment, please feel free to contact our support team." +
        "<br><br>Thank you for choosing " + AppInfo.appName + ". We look forward to serving you again!" +
        "<br><br><strong>Happy Shopping!</strong><br>" +
        "<br><br>Best regards,<br>" +
        "<strong>The " + AppInfo.appName + " Team</strong>" +
        "<br><br>Developer,<br>"+
        "<strong>Harshit Mishra</strong>"+
    "</body>" + 
    "</html>";


        JavaMailUtil.sendMail(recipientMailId, subject, htmlTextMessage);
    }
     
     public static int otp(String email) throws MessagingException{
         String subject="One Time Password";
         int otp=(int)(Math.random()*1000000);
         String htmlTextMessage="OTP is"+otp;
         JavaMailUtil.sendMail(email, subject, htmlTextMessage);
         return otp;
     }
}
