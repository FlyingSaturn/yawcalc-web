package com.example.demo;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class YawCalculatorController {

    @GetMapping("/calculate")
    @CrossOrigin(origins = "http://localhost:8000/")
    public String calculateyaw(@RequestParam("xcurrent") double xcurrent, 
    @RequestParam("zcurrent") double zcurrent,
    @RequestParam("xdest") double xdest, 
    @RequestParam("zdest") double zdest)
    {
        // Both zcurrent and zdest are to be negated before calculating the slope,
        // so written zcurrent - zdest instead of zdest - zcurrent
        // atan2 is for finding the angle of a line in radians, which is converted to degrees
        double slope = Math.atan2(zcurrent - zdest, xdest - xcurrent) * (180 / Math.PI);
        slope = Math.round(slope * 10.0) / 10.0; // To get the angles correct to 1 d.p. for discrepancies between radians and degrees
        slope += 90; // Rotating the whole minecraft yaw table 90 degrees
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
