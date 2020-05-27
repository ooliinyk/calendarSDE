package com.app.service;


import com.app.entity.Event;
import com.app.repository.EventRepository;

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

	;

	public Iterable<Event> findAll() {
		return eventRepository.findAll();
	}

	public Event create(Event event){
		return eventRepository.save(event);
	}

	public void deleteById(Long id){
		eventRepository.deleteById(id);
	}
}
