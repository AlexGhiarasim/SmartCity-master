
package SmartCity.controller;

import SmartCity.dto.ParkingSpotDTO;
import SmartCity.service.ParkingSpotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parkingspot")
public class ParkingSpotController {

    @Autowired
    private ParkingSpotService parkingSpotService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ParkingSpotDTO> createParkingSpot(@RequestBody ParkingSpotDTO parkingSpotDTO) {
        ParkingSpotDTO createdParkingSpot = parkingSpotService.createParkingSpot(parkingSpotDTO);
        return ResponseEntity.ok(createdParkingSpot);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<ParkingSpotDTO>> getAllParkingSpots() {
        List<ParkingSpotDTO> parkingSpotDTOList = parkingSpotService.getAllParkingSpots();
        return ResponseEntity.ok(parkingSpotDTOList);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ParkingSpotDTO> getParkingSpotById(@PathVariable Long id) {
        ParkingSpotDTO parkingSpotDTO = parkingSpotService.getParkingSpotById(id);
        if (parkingSpotDTO != null) {
            return ResponseEntity.ok(parkingSpotDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ParkingSpotDTO> updateParkingSpot(@PathVariable Long id, @RequestBody ParkingSpotDTO parkingSpotDTO) {
        ParkingSpotDTO updatedParkingSpot = parkingSpotService.updateParkingSpot(id, parkingSpotDTO);
        if (updatedParkingSpot != null) {
            return ResponseEntity.ok(updatedParkingSpot);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteParkingSpot(@PathVariable Long id) {
        parkingSpotService.deleteParkingSpot(id);
        return ResponseEntity.noContent().build();
    }
}
