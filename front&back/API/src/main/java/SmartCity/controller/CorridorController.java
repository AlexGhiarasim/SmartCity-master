package SmartCity.controller;

import SmartCity.dto.CorridorDTO;
import SmartCity.service.CorridorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/corridor")
public class CorridorController {

    @Autowired
    private CorridorService corridorService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CorridorDTO> createCorridor(@RequestBody CorridorDTO corridorDTO) {
        CorridorDTO createdCorridor = corridorService.createCorridor(corridorDTO);
        return ResponseEntity.ok(createdCorridor);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<CorridorDTO>> getAllCorridors() {
        List<CorridorDTO> corridorDTOList = corridorService.getAllCorridors();
        return ResponseEntity.ok(corridorDTOList);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<CorridorDTO> getCorridorById(@PathVariable Long id) {
        CorridorDTO corridorDTO = corridorService.getCorridorById(id);
        if (corridorDTO != null) {
            return ResponseEntity.ok(corridorDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<CorridorDTO> updateCorridor(@PathVariable Long id, @RequestBody CorridorDTO corridorDTO) {
        CorridorDTO updatedCorridor = corridorService.updateCorridor(id, corridorDTO);
        if (updatedCorridor != null) {
            return ResponseEntity.ok(updatedCorridor);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCorridor(@PathVariable Long id) {
        corridorService.deleteCorridor(id);
        return ResponseEntity.noContent().build();
    }
}
