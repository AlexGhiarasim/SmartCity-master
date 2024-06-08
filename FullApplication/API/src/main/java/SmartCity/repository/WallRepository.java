package SmartCity.repository;

import SmartCity.model.business.Wall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WallRepository extends JpaRepository<Wall, Long> {
    Optional<Object> findByParkingLotId(Long id);
}
