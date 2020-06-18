package com.app.repository;

import com.app.entity.EventType;

import org.springframework.data.repository.CrudRepository;

public interface EventTypeRepository extends CrudRepository<EventType, Long> {
}
