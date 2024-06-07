package SmartCity.dto;


import javax.persistence.*;

import SmartCity.model.business.ParkingLot;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ParkingSpotDTO {
    private Long id;

    private boolean occupied;

    private ParkingLot parkingLot;

    private int x; // Coordonata X a locului de parcare

    private int y; // Coordonata Y a locului de parcare

    public ParkingSpotDTO(Long id, boolean occupied, int x, int y) {
        this.id = id;
        this.occupied = occupied;
        this.x = x;
        this.y = y;
    }
}
