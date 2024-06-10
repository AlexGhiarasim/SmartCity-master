package SmartCity.service;


import SmartCity.dto.*;
import SmartCity.model.business.ParkingLot;
import SmartCity.repository.CorridorRepository;
import SmartCity.repository.ParkingLotRepository;
import SmartCity.repository.ParkingSpotRepository;
import SmartCity.repository.WallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParkingLotService {

    @Autowired
    private ParkingLotRepository parkingLotRepository;
    @Autowired
    private ParkingSpotRepository parkingSpotRepository;
    @Autowired
    private WallRepository wallRepository;
    @Autowired
    private CorridorRepository corridorRepository;

    public ParkingLotDTO createParkingLot(ParkingLotDTO parkingLotDTO) {
        ParkingLot parkingLot = new ParkingLot();
        parkingLot.setName(parkingLotDTO.getName());

        ParkingLot savedParkingLot = parkingLotRepository.save(parkingLot);
        return new ParkingLotDTO(savedParkingLot.getId(), savedParkingLot.getName());
    }

    public List<ParkingLotDTO> getAllParkingLots() {
        return parkingLotRepository.findAll().stream()
                .map(lot -> new ParkingLotDTO(lot.getId(), lot.getName()))
                .collect(Collectors.toList());
    }

    public ParkingLotDetailsDTO getParkingLotById(Long id) {
        ParkingLot parkingLot = parkingLotRepository.findById(id).orElse(null);
        if (parkingLot != null) {
            List<ParkingSpotDTO> parkingSpotDTOs = parkingLot.getParkingSpots().stream()
                    .map(spot -> new ParkingSpotDTO(spot.getId(), spot.isReserved(), spot.getX(), spot.getY(),spot.getReservationTime()))
                    .collect(Collectors.toList());

            List<WallDTO> wallDTOs = parkingLot.getWalls().stream()
                    .map(wall -> new WallDTO(wall.getId(), wall.getStartX(), wall.getStartY(), wall.getEndX(), wall.getEndY()))
                    .collect(Collectors.toList());

            List<CorridorDTO> corridorDTOs = parkingLot.getCorridors().stream()
                    .map(corridor -> new CorridorDTO(corridor.getId(), corridor.getStartX(), corridor.getStartY(), corridor.getEndX(), corridor.getEndY()))
                    .collect(Collectors.toList());

            return new ParkingLotDetailsDTO(parkingLot.getId(), parkingLot.getName(), parkingLot.getX(), parkingLot.getY(), parkingSpotDTOs, wallDTOs, corridorDTOs);
        }
        return null;
    }

    public ParkingLotDTO updateParkingLot(Long id, ParkingLotDTO parkingLotDTO) {
        Optional<ParkingLot> parkingLotOptional = parkingLotRepository.findById(id);
        if (parkingLotOptional.isPresent()) {
            ParkingLot parkingLot = parkingLotOptional.get();
            parkingLot.setName(parkingLotDTO.getName());

            ParkingLot updatedParkingLot = parkingLotRepository.save(parkingLot);
            return new ParkingLotDTO(updatedParkingLot.getId(), updatedParkingLot.getName());
        }
        return null;
    }

    public void deleteParkingLot(Long id) {
        parkingLotRepository.deleteById(id);
    }
}
