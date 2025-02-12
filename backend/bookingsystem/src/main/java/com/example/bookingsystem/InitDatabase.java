package com.example.bookingsystem;

import java.text.SimpleDateFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InitDatabase {
	private static final Logger log = LoggerFactory.getLogger(InitDatabase.class);	
	
	@Bean
	CommandLineRunner initDB(BookingRepository repo) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");		
		return args -> {
			log.info("Loading " + repo.save(new Booking("Dr. Quack", "injured finger", sdf.parse("2020-11-03 10:00"), sdf.parse("2020-11-03 10:30"))));
			log.info("Loading " + repo.save(new Booking("Max Paynt", "gunshot wounds", sdf.parse("2020-11-03 13:00"), sdf.parse("2020-11-03 13:08"))));
		};
	}
}
