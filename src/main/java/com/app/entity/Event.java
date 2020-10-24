package com.app.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Entity
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String title;

	@Column(length=5000)
	private String notes;

	private LocalDateTime startTime;

	private LocalDateTime endTime;

	private LocalDateTime created;

	private LocalDateTime updated;

	private String location;

// TODO DURING CREATE RETURN Empty values, but in DB correct values
	@ManyToOne(cascade = {CascadeType.MERGE})
	private EventType eventType;

	private String creator;

	private String branch;

	private Byte[] image;

	@ElementCollection
	private List<String> attendees= new ArrayList<>();

}
