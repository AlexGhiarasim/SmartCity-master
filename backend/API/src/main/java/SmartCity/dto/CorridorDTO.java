package SmartCity.dto;


import javax.persistence.*;

import SmartCity.model.business.ParkingLot;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class CorridorDTO {

    private Long id;

    private ParkingLot parkingLot;

    private int startX; // Coordonata X de start a coridorului

    private int startY; // Coordonata Y de start a coridorului

    private int endX; // Coordonata X de final a coridorului

    private int endY; // Coordonata Y de final a coridorului

    public CorridorDTO(Long id, int startX, int startY, int endX, int endY) {
        this.id = id;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }
}
