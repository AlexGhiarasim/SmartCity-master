package SmartCity.repository;


import SmartCity.model.business.ParkingSpot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, Long> {
    Optional<Object> findByParkingLotId(Long id);

    Optional<ParkingSpot> findByParkingLotIdAndXAndY(Long parkingLotId, int x, int y);}
