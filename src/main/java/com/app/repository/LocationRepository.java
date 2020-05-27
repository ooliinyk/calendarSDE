package com.app.repository;

import com.app.entity.Event;
import com.app.entity.Location;

import org.springframework.data.repository.CrudRepository;

public interface LocationRepository extends CrudRepository<Location, Long> {
}
