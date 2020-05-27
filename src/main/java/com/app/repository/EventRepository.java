package com.app.repository;

import com.app.entity.Event;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends CrudRepository<Event, Long> {

	@Query("from Event e where not(e.endTime < :from or e.startTime > :to)")
	List<Event> findBetween(@Param("from") @DateTimeFormat(iso= DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @Param("to") @DateTimeFormat(iso= DateTimeFormat.ISO.DATE_TIME) LocalDateTime end);
}
