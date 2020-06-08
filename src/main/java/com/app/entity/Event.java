package com.app.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
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

//TODO GENERATED VALUE IS NOT WORKING SEPARETLY, CHECK WHY

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;


	private String title;

	// add allowed length -
	private String notes;

	private LocalDateTime startTime;

	private LocalDateTime endTime;

	private LocalDateTime created;

	private LocalDateTime updated;

	private String location;

//	@ManyToOne(cascade = {CascadeType.ALL})
//	private Location location;

	@ManyToOne(cascade = {CascadeType.ALL})
	private EventInfo evnetInfo;

	private String creator;

	@ElementCollection
//	@CollectionTable(name ="attendees")
	private List<String> attendees= new ArrayList<>();

//	private String attendees;
//	@ManyToOne(cascade = {CascadeType.ALL})
//	User user;
}
