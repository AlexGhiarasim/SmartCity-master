package com.example.SmartCity.service;

import com.example.SmartCity.model.ParkingSpot;
import com.example.SmartCity.repository.ParkingSpotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingSpotService {

    @Autowired
    private ParkingSpotRepository parkingSpotRepository;

    public ParkingSpot createParkingSpot(ParkingSpot parkingSpot) {
        return parkingSpotRepository.save(parkingSpot);
    }

    public List<ParkingSpot> getAllParkingSpots() {
        return parkingSpotRepository.findAll();
    }

    public ParkingSpot getParkingSpotById(Long id) {
        return parkingSpotRepository.findById(id).orElse(null);
    }

    public void deleteParkingSpot(Long id) {
        parkingSpotRepository.deleteById(id);
    }

    public ParkingSpot updateParkingSpot(Long id, ParkingSpot parkingSpotDetails) {
        ParkingSpot parkingSpot = parkingSpotRepository.findById(id).orElse(null);
        if (parkingSpot != null) {
            parkingSpot.setOccupied(parkingSpotDetails.isOccupied());
            parkingSpot.setX(parkingSpotDetails.getX());
            parkingSpot.setY(parkingSpotDetails.getY());
            return parkingSpotRepository.save(parkingSpot);
        }
        return null;
    }
}
