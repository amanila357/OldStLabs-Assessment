package com.example.bookingsystem;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookingRepository extends JpaRepository<Booking, Long> {

	@Query("from Booking where start_date=?1")
	List<Booking> findByDate(Date date);

	@Query("from Booking where start_date between ?1 and ?2 order by start_date")
	List<Booking> findBetweenDates(Date d1, Date d2);

	@Query("from Booking where id != ?3 and ((?1 between start_date and end_date) or (?2 between start_date and end_date) or (start_date between ?1 and ?2) or (end_date between ?1 and ?2)) order by start_date")
	List<Booking> findExistingBookings(Date d1, Date d2, Long id);

}
