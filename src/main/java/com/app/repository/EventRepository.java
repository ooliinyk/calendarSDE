package com.app.repository;

import com.app.entity.Event;
import com.app.entity.EventCount;

import com.app.entity.enums.Branch;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends CrudRepository<Event, Long> {

	@Query("from Event e where not(e.end < :from or e.start > :to)")
	List<Event> findBetween(@Param("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @Param("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end);

	List<Event> findAllByEndLessThanEqualAndStartGreaterThanEqualAndBranchIn(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, List<Branch> branches);

	List<Event> findAllByEndLessThanEqualAndBranchIn(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)   LocalDateTime end, List<Branch> branches);

	List<Event> findAllByStartGreaterThanEqualAndBranchIn( @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, List<Branch> branches);

	@Query(value = "select  new com.app.entity.EventCount((count(e.id) + '') as count , DATE_FORMAT(e.start, '%Y-%m') as month)  " +
			"from Event e where not(e.end < :from or e.start > :to) group by month( e" +
			".start) ")
	List<EventCount> countEventsBetween(@Param("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @Param("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end);

// TODO convert countEventsBetween countEventsFrom to one function. Check for null should be checked on DB side
	@Query(value = "select  new com.app.entity.EventCount((count(e.id) + '') as count , DATE_FORMAT(e.start, '%Y-%m') as month)  " +
			"from Event e where e.start > :from group by month( e.start) ")
	List<EventCount> countEventsFrom(@Param("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start);

	@Query(value = "select  new com.app.entity.EventCount((count(e.id) + '') as count , DATE_FORMAT(e.start, '%Y-%m') as month)  " +
			"from Event e where year(e.start) = :year group by month( e.start) ")
	List<EventCount> countEventsInYear(@Param("year") Integer year);

}
