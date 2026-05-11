/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.utility;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author mishr
 */
public class IDUtil {
    
    public static String generateProdId(){
        Date today=new Date();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddhhmmss");
        String prodId=sdf.format(today);
        float x=(float)Math.random()*10000;
	int y=(int)x;
	prodId="P"+prodId+Integer.toString(y);
        return prodId;
    }
    public static String generateJobId(){
        Date today=new Date();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddhhmmss");
        String jobId=sdf.format(today);
        float x=(float)Math.random()*10000;
	int y=(int)x;
	jobId="J"+jobId+Integer.toString(y);
        return jobId;
    }
    public static String generateApplicationId(){
        Date today=new Date();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddhhmmss");
        String applicationId=sdf.format(today);
        float x=(float)Math.random()*10000;
	int y=(int)x;
	applicationId="A"+applicationId+Integer.toString(y);
        return applicationId;
    }
    
     public static String generateTransId(){
        Date today=new Date();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddhhmmss");
        String transId=sdf.format(today);
        transId="T"+transId;
        return transId;
    }
     
     public static String generateRentalId(){
        Date today=new Date();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddhhmmss");
        String rentalId=sdf.format(today);
        float x=(float)Math.random()*10000;
	int y=(int)x;
	rentalId="R"+rentalId+Integer.toString(y);
        return rentalId;
    }
    
}
