package SmartCity.service;

import SmartCity.dto.ParkingSpotDTO;
import SmartCity.model.business.ParkingSpot;
import SmartCity.repository.ParkingSpotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParkingSpotService {

    @Autowired
    private ParkingSpotRepository parkingSpotRepository;

    public ParkingSpotDTO createParkingSpot(ParkingSpotDTO parkingSpotDTO) {
        ParkingSpot parkingSpot = new ParkingSpot();
        parkingSpot.setOccupied(parkingSpotDTO.isOccupied());
        parkingSpot.setX(parkingSpotDTO.getX());
        parkingSpot.setY(parkingSpotDTO.getY());

        ParkingSpot savedParkingSpot = parkingSpotRepository.save(parkingSpot);
        return new ParkingSpotDTO(savedParkingSpot.getId(), savedParkingSpot.isOccupied(), savedParkingSpot.getX(), savedParkingSpot.getY());
    }

    public List<ParkingSpotDTO> getAllParkingSpots() {
        return parkingSpotRepository.findAll().stream()
                .map(spot -> new ParkingSpotDTO(spot.getId(), spot.isOccupied(), spot.getX(), spot.getY()))
                .collect(Collectors.toList());
    }

    public ParkingSpotDTO getParkingSpotById(Long id) {
        Optional<ParkingSpot> parkingSpotOptional = parkingSpotRepository.findById(id);
        return parkingSpotOptional.map(spot -> new ParkingSpotDTO(spot.getId(), spot.isOccupied(), spot.getX(), spot.getY())).orElse(null);
    }

    public ParkingSpotDTO updateParkingSpot(Long id, ParkingSpotDTO parkingSpotDTO) {
        Optional<ParkingSpot> parkingSpotOptional = parkingSpotRepository.findById(id);
        if (parkingSpotOptional.isPresent()) {
            ParkingSpot parkingSpot = parkingSpotOptional.get();
            parkingSpot.setOccupied(parkingSpotDTO.isOccupied());
            parkingSpot.setX(parkingSpotDTO.getX());
            parkingSpot.setY(parkingSpotDTO.getY());

            ParkingSpot updatedParkingSpot = parkingSpotRepository.save(parkingSpot);
            return new ParkingSpotDTO(updatedParkingSpot.getId(), updatedParkingSpot.isOccupied(), updatedParkingSpot.getX(), updatedParkingSpot.getY());
        }
        return null;
    }

    public void deleteParkingSpot(Long id) {
        parkingSpotRepository.deleteById(id);
    }
}
