package com.example.bookingsystem;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Booking {
	private @Id @GeneratedValue Long id;
	private String name;
	private String comments;
	private Date startDate;
	private Date endDate;
	
	public Booking() {
	}

	public Booking(String name, String comments, Date startDate, Date endDate) {
		this.name = name;
		this.comments = comments;
		this.startDate = startDate;
		this.endDate = endDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}
	
	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date date) {
		this.startDate = date;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	@Override
	public String toString() {
		return "Booking: "+ name + ", Comment/s: " + comments + " Start Date: " + startDate + " End Date: " + endDate;
	}
}
