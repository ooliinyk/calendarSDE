package com.app.repository;

import com.app.entity.Event;
import com.app.entity.EventCount;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends CrudRepository<Event, Long> {

	@Query("from Event e where not(e.endTime < :from or e.startTime > :to)")
	List<Event> findBetween(@Param("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @Param("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end);

	List<Event> findAllByEndTimeLessThanEqualAndStartTimeGreaterThanEqualAndBranchIs(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, String branch);

	List<Event> findAllByEndTimeLessThanEqualAndBranchIs(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)   LocalDateTime endTime, String branch);

	List<Event> findAllByStartTimeGreaterThanEqualAndBranchIs( @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, String branch);

	@Query(value = "select  new com.app.entity.EventCount((count(e.id) + '') as count , DATE_FORMAT(e.startTime, '%Y-%m') as month)  " +
			"from Event e where not(e.endTime < :from or e.startTime > :to) group by month( e" +
			".startTime) ")
	List<EventCount> countEventsBetween(@Param("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @Param("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end);

// TODO convert countEventsBetween countEventsFrom to one function. Check for null should be checked on DB side
	@Query(value = "select  new com.app.entity.EventCount((count(e.id) + '') as count , DATE_FORMAT(e.startTime, '%Y-%m') as month)  " +
			"from Event e where e.startTime > :from group by month( e.startTime) ")
	List<EventCount> countEventsFrom(@Param("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start);

	@Query(value = "select  new com.app.entity.EventCount((count(e.id) + '') as count , DATE_FORMAT(e.startTime, '%Y-%m') as month)  " +
			"from Event e where year(e.startTime) = :year group by month( e.startTime) ")
	List<EventCount> countEventsInYear(@Param("year") Integer year);

}
