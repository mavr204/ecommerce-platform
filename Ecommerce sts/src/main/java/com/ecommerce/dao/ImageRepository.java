package com.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.bean.Image;

public interface ImageRepository extends JpaRepository<Image, Integer> {
}

