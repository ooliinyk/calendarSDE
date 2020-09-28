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
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;

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

	@CrossOrigin
	@GetMapping("/api/welcome")
	@ResponseBody
	public String home() {
		return "Welcome!";
	}

	@CrossOrigin
	@GetMapping("/api/events")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	public Iterable<Event> events(@RequestParam(value = "start", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
						   @RequestParam(value = "end", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
		return calendarService.findBetween(start, end);
	}


	@CrossOrigin
	@GetMapping("/api/events/map")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	public Map<YearMonth, List<Event>> findBetweenNew(@RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
						   @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
		return calendarService.findYearMonthEventBetween(start, end);
	}
	@CrossOrigin
	@GetMapping("/api/events/all")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	public Iterable<Event> events() {
		return calendarService.findAll();
	}


	@CrossOrigin
	@PostMapping("/api/events/create")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Transactional
	public Event createEvent(@RequestBody Event event) {
		return calendarService.create(event);
	}

	@CrossOrigin
	@DeleteMapping("/api/events/{id}/delete")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Transactional
	@ResponseStatus(HttpStatus.OK)
	public void deleteEvent(@PathVariable("id") Long id) {
		 calendarService.deleteById(id);
	}

	@CrossOrigin
	@GetMapping("/api/events/{id}")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Transactional
	public Event findEventById(@PathVariable("id") Long id) {
		return calendarService.findById(id);

	}

	@CrossOrigin
	@GetMapping("/api/events/count")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	List<EventCount> countEventsBetween(@RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
													@RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
		return calendarService.countEventsBetween(start, end);
	}

	@CrossOrigin
	@GetMapping("/api/events/countAll")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	Long countAllEvents() {
		return calendarService.countAllEvents();
	}

	@CrossOrigin
	@GetMapping("/api/events/countInYear")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	List<EventCount> countEventsBetween(@RequestParam("year")  Integer year) {
		return calendarService.countEventsInYear(year);
	}

	@CrossOrigin
	@GetMapping("/api/eventTypes")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	Iterable<EventType> eventTypes() {
		return eventTypeService.findAll();
	}

	@CrossOrigin
	@GetMapping("/api/eventTypes/{id}")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Transactional
	public EventType findEventTypeById(@PathVariable("id") Long id) {

		return eventTypeService.findById(id);

	}

}
