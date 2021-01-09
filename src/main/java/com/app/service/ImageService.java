package com.app.service;

import com.app.entity.Image;
import com.app.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public ResponseEntity getImageById(long id) {

        Optional<Image> image = imageRepository.findById(id);
        if (image.isPresent()) {

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(image.get().getType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.get().getName() + "\"")
                    .body(image.get().getData());
        }
        return ResponseEntity.notFound().build();
    }

}
