package com.example.SmartCity.service;

import com.example.SmartCity.model.Wall;
import com.example.SmartCity.repository.WallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WallService {

    @Autowired
    private WallRepository wallRepository;

    public Wall createWall(Wall wall) {
        return wallRepository.save(wall);
    }

    public List<Wall> getAllWalls() {
        return wallRepository.findAll();
    }

    public Wall getWallById(Long id) {
        return wallRepository.findById(id).orElse(null);
    }

    public void deleteWall(Long id) {
        wallRepository.deleteById(id);
    }

    public Wall updateWall(Long id, Wall wallDetails) {
        Wall wall = wallRepository.findById(id).orElse(null);
        if (wall != null) {
            wall.setStartX(wallDetails.getStartX());
            wall.setStartY(wallDetails.getStartY());
            wall.setEndX(wallDetails.getEndX());
            wall.setEndY(wallDetails.getEndY());
            return wallRepository.save(wall);
        }
        return null;
    }
}

