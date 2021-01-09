package com.app.rest.resource;

import com.app.service.ImageService;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;

@Api(value = "ImageResourceV1", description = "Resource for ..")
@RestController
@RequestMapping(value = "/v1/images")
public class ImageResourceV1 {

    @Autowired
    ImageService imageService;

    @CrossOrigin
    @GetMapping("/api/image/{id}")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @Transactional
    public ResponseEntity findEventById(@PathVariable("id") Long id) {
        return imageService.getImageById(id);

    }
}
