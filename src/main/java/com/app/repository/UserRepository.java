package com.app.repository;

import com.app.entity.Event;
import com.app.entity.User;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository  extends CrudRepository<User, Long> {
}
