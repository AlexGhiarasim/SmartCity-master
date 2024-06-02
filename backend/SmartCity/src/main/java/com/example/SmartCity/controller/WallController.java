package com.example.SmartCity.controller;

import com.example.SmartCity.model.Wall;
import com.example.SmartCity.service.WallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wall")
public class WallController {

    @Autowired
    private WallService wallService;

    @PostMapping("/create")
    public Wall createWall(@RequestBody Wall wall) {
        return wallService.createWall(wall);
    }

    @GetMapping("/all")
    public List<Wall> getAllWalls() {
        return wallService.getAllWalls();
    }

    @GetMapping("/{id}")
    public Wall getWallById(@PathVariable Long id) {
        return wallService.getWallById(id);
    }

    @PatchMapping("/{id}")
    public Wall updateWall(@PathVariable Long id, @RequestBody Wall wallDetails) {
        return wallService.updateWall(id, wallDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteWall(@PathVariable Long id) {
        wallService.deleteWall(id);
    }
}
