package com.app.rest.resource;


import com.app.entity.Event;
import com.app.entity.EventCount;
import com.app.entity.EventType;
import com.app.service.CalendarService;
import com.app.service.EventTypeService;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import io.swagger.annotations.Api;

@Api(value = "CalendarResourceV1", description = "Resource for ..")
@RestController
@RequestMapping(value = "/v1/calendar")
public class CalendarResourceV1 {

	@Autowired
	CalendarService calendarService;

	@Autowired
	EventTypeService eventTypeService;

	@GetMapping("/api/welcome")
	@ResponseBody
	String home() {
		return "Welcome!";
	}


	@GetMapping("/api/events")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	Iterable<Event> events(@RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
						   @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
		return calendarService.findBetween(start, end);
	}

	@GetMapping("/api/events/all")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	Iterable<Event> events() {
		return calendarService.findAll();
	}


	@PostMapping("/api/events/create")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Transactional
	Event createEvent(@RequestBody Event event) {
		return calendarService.create(event);
	}

	@DeleteMapping("/api/events/{id}/delete")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Transactional
	public void deleteEvent(@PathVariable("id") Long id) {

		calendarService.deleteById(id);

	}

	@GetMapping("/api/events/{id}")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Transactional
	public Event findEventById(@PathVariable("id") Long id) {

		return calendarService.findById(id);

	}

	@GetMapping("/api/events/count")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	List<EventCount> countEventsBetween(@RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
													@RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
		return calendarService.countEventsBetween(start, end);
	}

	@GetMapping("/api/events/countAll")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	Long countAllEvents() {
		return calendarService.countAllEvents();
	}

	@GetMapping("/api/events/countInYear")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	List<EventCount> countEventsBetween(@RequestParam("year")  Integer year) {
		return calendarService.countEventsInYear(year);
	}

	@GetMapping("/api/eventTypes")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	Iterable<EventType> eventTypes() {
		return eventTypeService.findAll();
	}

	@GetMapping("/api/eventTypes/{id}")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Transactional
	public EventType findEventTypeById(@PathVariable("id") Long id) {

		return eventTypeService.findById(id);

	}

}
