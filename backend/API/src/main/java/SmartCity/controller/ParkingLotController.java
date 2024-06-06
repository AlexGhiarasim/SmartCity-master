package SmartCity.controller;

import SmartCity.dto.ParkingLotDTO;
import SmartCity.service.ParkingLotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parkinglot")
public class ParkingLotController {

    @Autowired
    private ParkingLotService parkingLotService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ParkingLotDTO> createParkingLot(@RequestBody ParkingLotDTO parkingLotDTO) {
        ParkingLotDTO createdParkingLot = parkingLotService.createParkingLot(parkingLotDTO);
        return ResponseEntity.ok(createdParkingLot);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<ParkingLotDTO>> getAllParkingLots() {
        List<ParkingLotDTO> parkingLotDTOList = parkingLotService.getAllParkingLots();
        return ResponseEntity.ok(parkingLotDTOList);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ParkingLotDTO> getParkingLotById(@PathVariable Long id) {
        ParkingLotDTO parkingLotDTO = parkingLotService.getParkingLotById(id);
        if (parkingLotDTO != null) {
            return ResponseEntity.ok(parkingLotDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ParkingLotDTO> updateParkingLot(@PathVariable Long id, @RequestBody ParkingLotDTO parkingLotDTO) {
        ParkingLotDTO updatedParkingLot = parkingLotService.updateParkingLot(id, parkingLotDTO);
        if (updatedParkingLot != null) {
            return ResponseEntity.ok(updatedParkingLot);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteParkingLot(@PathVariable Long id) {
        parkingLotService.deleteParkingLot(id);
        return ResponseEntity.noContent().build();
    }
}
