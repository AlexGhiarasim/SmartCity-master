package SmartCity.repository;

import SmartCity.model.business.Corridor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CorridorRepository extends JpaRepository<Corridor, Long> {
    Optional<Object> findByParkingLotId(Long id);
}
