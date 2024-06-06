package SmartCity.service;


import SmartCity.dto.ParkingLotDTO;
import SmartCity.model.business.ParkingLot;
import SmartCity.repository.ParkingLotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParkingLotService {

    @Autowired
    private ParkingLotRepository parkingLotRepository;

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

    public ParkingLotDTO getParkingLotById(Long id) {
        Optional<ParkingLot> parkingLotOptional = parkingLotRepository.findById(id);
        return parkingLotOptional.map(lot -> new ParkingLotDTO(lot.getId(), lot.getName())).orElse(null);
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
