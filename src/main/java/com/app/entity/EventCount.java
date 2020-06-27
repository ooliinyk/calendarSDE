package com.app.entity;

import lombok.Data;

@Data
public class EventCount {

	private Long count;
	private String month;

	public EventCount(Long count, String month) {
		this.count = count;
		this.month = month;
	}
}
