package com.app.service;

import com.app.entity.Event;
import com.app.entity.EventType;
import com.app.repository.EventTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventTypeService {

	@Autowired
	EventTypeRepository eventTypeRepository;

	public Iterable<EventType> findAll() {
		return eventTypeRepository.findAll();
	}

	public EventType findById(Long id) {
// TODO  check get.
		return eventTypeRepository.findById(id).get();
	}


}
