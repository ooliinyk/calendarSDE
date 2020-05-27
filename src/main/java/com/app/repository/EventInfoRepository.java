package com.app.repository;

import com.app.entity.Event;
import com.app.entity.EventInfo;

import org.springframework.data.repository.CrudRepository;

public interface EventInfoRepository extends CrudRepository<EventInfo, Long> {
}
