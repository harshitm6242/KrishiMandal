/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package in.krishimandal.utility;

/**
 *
 * @author mishr
 */
public class AppInfo {
     public static final String appName="Krishi Mandal";
    // Read email credentials from environment variables for security.
    // Set APP_EMAIL and APP_EMAIL_PASSWORD in your servlet container (Tomcat) or system environment.
    // Fallbacks are kept only for local development; remove fallbacks in production.
    public static final String email = System.getenv().getOrDefault("APP_EMAIL", "mishraharshit6242@gmail.com");
    public static final String password = System.getenv().getOrDefault("APP_EMAIL_PASSWORD", "fvom njyj glxu kxzi");
}
