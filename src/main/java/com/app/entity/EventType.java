package com.app.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class EventType {

	@Id
//	TODO Ask which DB would be. In db maria no sequence, it would be good to have different creator for ID for all entities
//	@TableGenerator(name = "addition_type_id_seq", allocationSize = 1, table = "ADDITION_TYPE_SEQUENCES",
//			pkColumnName = "SEQ_NAME",
//			valueColumnName = "SEQ_NUMBER",
//			pkColumnValue = "SEQUENCE")
//	@GeneratedValue(strategy = GenerationType.TABLE, generator = "addition_type_id_seq")
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	private String name;
	private String color;

}
