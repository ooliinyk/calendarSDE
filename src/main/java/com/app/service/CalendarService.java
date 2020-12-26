package com.app.service;


import com.app.entity.Event;
import com.app.entity.EventCount;
import com.app.entity.enums.Branch;
import com.app.exception.NoEventException;
import com.app.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CalendarService {

    @Autowired
    EventRepository eventRepository;

    public List<Event> findBetween(LocalDateTime start, LocalDateTime end, Branch branch) {
        //	TODO in future findAllByEndTimeLessThanEqualAndStartTimeGreaterThanEqual should allow null values.
        //	https://www.onooks.com/spring-data-jpa-named-query-ignoring-null-parameters/
        List<Branch> branches = new ArrayList<>();
        branches.add(branch);
        branches.add(Branch.GENERAL);

        if (start == null && end == null) {
            return eventRepository.findByBranchIn(branches);
        }
        if (start == null || start.equals("")) {
            return eventRepository.findAllByEndLessThanEqualAndBranchIn(end, branches);
        } else if (end == null || end.equals("")) {
            return eventRepository.findAllByStartGreaterThanEqualAndBranchIn(start, branches);
        }
        return eventRepository.findAllByEndLessThanEqualOrStartGreaterThanEqualAndBranchIn(end, start, branches);

    }

    public Map<YearMonth, List<Event>> findYearMonthEventBetween(LocalDateTime start, LocalDateTime end,
            Branch branch) {
        return findBetween(start, end, branch).stream()
                .collect(Collectors.groupingBy(e -> YearMonth.from(e.getStart())));
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

    public Event update(Event event) throws NoEventException {
        if (eventRepository.findById(event.getId()).isPresent()) {
            event.setUpdated(LocalDateTime.now());
            return eventRepository.save(event);
        } else {
            throw new NoEventException("there is no events with id=" + event.getId());
        }

    }

    public void deleteById(Long id) {
        eventRepository.deleteById(id);
    }

    public Event findById(Long id) {
        return eventRepository.findById(id).get();
    }
}
