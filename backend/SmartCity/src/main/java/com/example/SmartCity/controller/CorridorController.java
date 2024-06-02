package com.example.SmartCity.controller;

import com.example.SmartCity.model.Corridor;
import com.example.SmartCity.service.CorridorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/corridor")
public class CorridorController {

    @Autowired
    private CorridorService corridorService;

    @PostMapping("/create")
    public Corridor createCorridor(@RequestBody Corridor corridor) {
        return corridorService.createCorridor(corridor);
    }

    @GetMapping("/all")
    public List<Corridor> getAllCorridors() {
        return corridorService.getAllCorridors();
    }

    @GetMapping("/{id}")
    public Corridor getCorridorById(@PathVariable Long id) {
        return corridorService.getCorridorById(id);
    }

    @PatchMapping("/{id}")
    public Corridor updateCorridor(@PathVariable Long id, @RequestBody Corridor corridorDetails) {
        return corridorService.updateCorridor(id, corridorDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteCorridor(@PathVariable Long id) {
        corridorService.deleteCorridor(id);
    }
}
