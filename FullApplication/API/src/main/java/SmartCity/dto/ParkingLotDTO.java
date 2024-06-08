package SmartCity.dto;


import javax.persistence.*;

import SmartCity.model.business.Corridor;
import SmartCity.model.business.ParkingSpot;
import SmartCity.model.business.Wall;
import lombok.*;

import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ParkingLotDTO {
    private Long id;

    private String name;

    private List<ParkingSpot> parkingSpots;

    private List<Corridor> corridors;

    private List<Wall> walls;

    public ParkingLotDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
