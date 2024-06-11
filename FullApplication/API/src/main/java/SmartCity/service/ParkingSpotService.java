package SmartCity.service;

import SmartCity.dto.ParkingSpotDTO;
import SmartCity.model.business.ParkingSpot;
import SmartCity.repository.ParkingSpotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParkingSpotService {

    @Autowired
    private ParkingSpotRepository parkingSpotRepository;

    public ParkingSpotDTO createParkingSpot(ParkingSpotDTO parkingSpotDTO) {
        ParkingSpot parkingSpot = new ParkingSpot();
        parkingSpot.setReserved(parkingSpotDTO.isReserved());
        parkingSpot.setX(parkingSpotDTO.getX());
        parkingSpot.setY(parkingSpotDTO.getY());

        ParkingSpot savedParkingSpot = parkingSpotRepository.save(parkingSpot);
        return new ParkingSpotDTO(savedParkingSpot.getId(), savedParkingSpot.isReserved(), savedParkingSpot.getX(), savedParkingSpot.getY(),savedParkingSpot.getReservationTime());
    }

    public List<ParkingSpotDTO> getAllParkingSpots() {
        return parkingSpotRepository.findAll().stream()
                .map(spot -> new ParkingSpotDTO(spot.getId(), spot.isReserved(), spot.getX(), spot.getY(),spot.getReservationTime()))
                .collect(Collectors.toList());
    }

    public ParkingSpotDTO getParkingSpotById(Long id) {
        Optional<ParkingSpot> parkingSpotOptional = parkingSpotRepository.findById(id);
        return parkingSpotOptional.map(spot -> new ParkingSpotDTO(spot.getId(), spot.isReserved(), spot.getX(), spot.getY(),spot.getReservationTime())).orElse(null);
    }

    public ParkingSpotDTO updateParkingSpot(Long id, ParkingSpotDTO parkingSpotDTO) {
        Optional<ParkingSpot> parkingSpotOptional = parkingSpotRepository.findById(id);
        if (parkingSpotOptional.isPresent()) {
            ParkingSpot parkingSpot = parkingSpotOptional.get();
            parkingSpot.setReserved(parkingSpotDTO.isReserved());
            parkingSpot.setX(parkingSpotDTO.getX());
            parkingSpot.setY(parkingSpotDTO.getY());

            ParkingSpot updatedParkingSpot = parkingSpotRepository.save(parkingSpot);
            return new ParkingSpotDTO(updatedParkingSpot.getId(), updatedParkingSpot.isReserved(), updatedParkingSpot.getX(), updatedParkingSpot.getY(),updatedParkingSpot.getReservationTime());
        }
        return null;
    }

    public void deleteParkingSpot(Long id) {
        parkingSpotRepository.deleteById(id);
    }

    private final Duration reservationDuration = Duration.ofHours(1); // Reservation duration

    @Transactional
    public ParkingSpotDTO reserveParkingSpot(Long parkingLotId, int x, int y) {
        Optional<ParkingSpot> optionalParkingSpot = parkingSpotRepository.findByParkingLotIdAndXAndY(parkingLotId, x, y);
        if (optionalParkingSpot.isPresent()) {
            ParkingSpot parkingSpot = optionalParkingSpot.get();
            if (!parkingSpot.isReserved()) {
                parkingSpot.setReserved(true);
                parkingSpot.setReservationTime(LocalDateTime.now());
                parkingSpotRepository.save(parkingSpot);
                return new ParkingSpotDTO(parkingSpot.getId(), parkingSpot.isReserved(), parkingSpot.getX(), parkingSpot.getY(), parkingSpot.getReservationTime(), parkingLotId);
            }
        }
        return null;
    }

    // Method to free expired reservations
    @Transactional
    public void freeExpiredReservations() {
        LocalDateTime now = LocalDateTime.now();
        List<ParkingSpot> spots = parkingSpotRepository.findAll();
        for (ParkingSpot spot : spots) {
            if (spot.isReserved() && spot.getReservationTime().plus(reservationDuration).isBefore(now)) {
                spot.setReserved(false);
                spot.setReservationTime(null);
                parkingSpotRepository.save(spot);
            }
        }
    }
}