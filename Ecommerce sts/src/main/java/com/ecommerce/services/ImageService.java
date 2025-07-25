package com.ecommerce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ecommerce.bean.Image;
import com.ecommerce.dao.ImageRepository;

import java.util.Optional;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;

    public Image saveImage(Image file) {
        return imageRepository.save(file);
    }
    public byte[] getImage(Integer id) {
        Optional<Image> imageOptional = imageRepository.findById(id);
        return imageOptional.map(Image::getData).orElse(null);
    }
}