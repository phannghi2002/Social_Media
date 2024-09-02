package com.rs.social_media.utils;

import java.util.Random;

public class CreateOTP {
    public Integer generateOTP() {
        Random random = new Random();
        return random.nextInt(900000) + 100000; // Generates a random number between 100000 and 999999

    }
}
