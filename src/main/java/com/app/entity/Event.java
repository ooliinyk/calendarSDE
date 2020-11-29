package com.app.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.app.entity.enums.Branch;
import lombok.Data;

@Data
@Entity
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String title;

	@Column(length=60000)
	private String notes;

	private LocalDateTime start;

	private LocalDateTime end;

	private LocalDateTime created;

	private LocalDateTime updated;

	private String location;

// TODO DURING CREATE RETURN Empty values, but in DB correct values
	@ManyToOne(cascade = {CascadeType.MERGE})
	private EventType eventType;

	private String creator;

	@Enumerated(EnumType.ORDINAL)
	private Branch branch;

	private Byte[] image;

	@ElementCollection
	private List<String> attendees= new ArrayList<>();

}
