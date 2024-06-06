package SmartCity.controller;

import SmartCity.dto.WallDTO;
import SmartCity.service.WallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/wall")
public class WallController {

    @Autowired
    private WallService wallService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<WallDTO> createWall(@RequestBody WallDTO wallDTO) {
        WallDTO createdWall = wallService.createWall(wallDTO);
        return ResponseEntity.ok(createdWall);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<WallDTO>> getAllWalls() {
        List<WallDTO> wallDTOList = wallService.getAllWalls();
        return ResponseEntity.ok(wallDTOList);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<WallDTO> getWallById(@PathVariable Long id) {
        WallDTO wallDTO = wallService.getWallById(id);
        if (wallDTO != null) {
            return ResponseEntity.ok(wallDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<WallDTO> updateWall(@PathVariable Long id, @RequestBody WallDTO wallDTO) {
        WallDTO updatedWall = wallService.updateWall(id, wallDTO);
        if (updatedWall != null) {
            return ResponseEntity.ok(updatedWall);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteWall(@PathVariable Long id) {
        wallService.deleteWall(id);
        return ResponseEntity.noContent().build();
    }
}
