package com.sparkjava;
import static spark.Spark.*;

public class YawCalculatorServer {
    public static void main(String[] args) {
        port(8080);
        get("/calculate-yaw", (req, res) -> {
            int locX = Double.parseDouble(req.queryParams("locX"));
            int locZ = Double.parseDouble(req.queryParams("locZ"));
            int destX = Double.parseDouble(req.queryParams("destX"));
            int destZ = Double.parseDouble(req.queryParams("destZ"));
            
            // Your yaw calculation logic here
            String yaw = calculateyaw(locX, locY, destX, destY);
            
            return yaw;
        });
    }

    private String calculateyaw(int xcurrent, int zcurrent, int xdest, int zdest)
    {
        // Both zcurrent and zdest are to be negated before calculating the slope,
        // so written zcurrent - zdest instead of zdest - zcurrent
        // atan2 is for finding the angle of a line in radians, which is converted to degrees
        double slope = Math.atan2(zcurrent - zdest, xdest - xcurrent) * (180 / Math.PI);
        System.out.println(slope);
        slope = Math.round(slope * 10.0) / 10.0; // To get the angles correct to 1 d.p. for discrepancies between radians and degrees
        slope += 90; // Rotating the whole minecraft yaw table 90 degrees anticlockwise
        slope *= -1; // On rotation, we get negative values in the positive quadrants of 'y' (or -Z axis)
        if (Math.abs(slope) > 180)
            slope = -360 * Math.signum(slope) + slope;
        if (slope == 0)
            return "-0.0";
        else if (slope == -180)
            return "180.0";
        else
            return Double.toString(slope);
    }
}
