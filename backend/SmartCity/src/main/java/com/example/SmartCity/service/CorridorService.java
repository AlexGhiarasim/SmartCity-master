package com.example.SmartCity.service;


import com.example.SmartCity.model.Corridor;
import com.example.SmartCity.repository.CorridorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CorridorService {

    @Autowired
    private CorridorRepository corridorRepository;

    public Corridor createCorridor(Corridor corridor) {
        return corridorRepository.save(corridor);
    }

    public List<Corridor> getAllCorridors() {
        return corridorRepository.findAll();
    }

    public Corridor getCorridorById(Long id) {
        return corridorRepository.findById(id).orElse(null);
    }

    public void deleteCorridor(Long id) {
        corridorRepository.deleteById(id);
    }

    public Corridor updateCorridor(Long id, Corridor corridorDetails) {
        Corridor corridor = corridorRepository.findById(id).orElse(null);
        if (corridor != null) {
            corridor.setStartX(corridorDetails.getStartX());
            corridor.setStartY(corridorDetails.getStartY());
            corridor.setEndX(corridorDetails.getEndX());
            corridor.setEndY(corridorDetails.getEndY());
            return corridorRepository.save(corridor);
        }
        return null;
    }
}

