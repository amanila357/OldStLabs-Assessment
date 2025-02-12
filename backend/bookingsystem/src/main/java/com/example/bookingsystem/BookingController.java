package com.example.bookingsystem;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
class BookingController {
	private final BookingRepository repo;

	BookingController(BookingRepository repo) {
		this.repo = repo;
	}

	private Date parseDate(String date) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Date formattedDate = null;
		try {
			formattedDate = sdf.parse(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return formattedDate;
	}

	@GetMapping("/bookings")
	List<Booking> getAllBookings() {
		return repo.findAll();

	}

	@GetMapping("/bookingdates")
	List<Booking> getAllBookingsByDates(@RequestParam String date1, @RequestParam String date2) {
		if (date1.isEmpty() && date2.isEmpty()) {
			return repo.findAll();
		}
		Date d1 = parseDate(date1);
		Date d2 = parseDate(date2);
		return repo.findBetweenDates(d1, d2);
	}
	
	@GetMapping("/existbooking")
	List<Booking> getExistingBookings(@RequestParam String date1, @RequestParam String date2, @RequestParam Long id) {
		Date d1 = parseDate(date1);
		Date d2 = parseDate(date2);
		return repo.findExistingBookings(d1, d2, id);
	}

	@GetMapping("/booking")
	Booking getBooking(@RequestParam Long id) {
		return repo.findById(id).orElseGet(() -> {
			return null;
		});
	}

	@PostMapping("/booking")
	Booking addBooking(@RequestParam String name, @RequestParam String comments, @RequestParam String startDate, @RequestParam String endDate) {
		return repo.save(new Booking(name, comments, parseDate(startDate), parseDate(endDate)));
	}

	@PutMapping("/booking")
	Booking editBooking(@RequestParam Long id, @RequestParam String name, @RequestParam String comments,
			@RequestParam String startDate, @RequestParam String endDate) {
		return repo.findById(id).map(booking -> {
			booking.setName(name);
			booking.setComments(comments);
			booking.setStartDate(parseDate(startDate));
			booking.setEndDate(parseDate(endDate));
			return repo.save(booking);
		}).orElseGet(() -> {
			return null;
		});
	}

	@DeleteMapping("/booking")
	void deleteBooking(@RequestParam Long id) {
		repo.deleteById(id);
	}
}
