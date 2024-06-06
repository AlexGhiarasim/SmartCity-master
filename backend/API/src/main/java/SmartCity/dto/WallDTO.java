package SmartCity.dto;


import javax.persistence.*;

import SmartCity.model.business.ParkingLot;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class WallDTO {
    private Long id;

    private ParkingLot parkingLot;

    private int startX; // Coordonata X de start a zidului

    private int startY; // Coordonata Y de start a zidului

    private int endX; // Coordonata X de final a zidului

    private int endY; // Coordonata Y de final a zidului

    public WallDTO(Long id, int startX, int startY, int endX, int endY) {
        this.id = id;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }
}
