package com.app.service;


import com.app.entity.Event;
import com.app.entity.EventCount;
import com.app.repository.EventRepository;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CalendarService {

	@Autowired
	EventRepository eventRepository;

	public List<Event> findBetween(LocalDateTime start, LocalDateTime end) {
		return eventRepository.findBetween(start, end);
	}

	public List<EventCount> countEventsBetween(LocalDateTime start, LocalDateTime end) {
		if (end == null || end.equals("")) {
			return eventRepository.countEventsFrom(start);
		}
		return eventRepository.countEventsBetween(start, end);
	}

	public Long countAllEvents() {
		return eventRepository.count();
	}

	public List<EventCount> countEventsInYear(Integer year) {
		return eventRepository.countEventsInYear(year);
	}

	public Iterable<Event> findAll() {
		return eventRepository.findAll();
	}

	public Event create(Event event) {
		event.setCreated(LocalDateTime.now());
		event.setUpdated(LocalDateTime.now());
		return eventRepository.save(event);
	}

	public void deleteById(Long id) {
		eventRepository.deleteById(id);
	}

	public Event findById(Long id) {
// TODO  check get.
		return eventRepository.findById(id).get();
	}
}
