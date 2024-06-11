package SmartCity.dto;


import javax.persistence.*;

import SmartCity.model.business.ParkingLot;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ParkingSpotDTO {
    private Long id;

    private boolean reserved;
    private LocalDateTime reservationTime; // New field for reservation time

    private Long parkingLotId;
    private int x; // Coordonata X a locului de parcare

    private int y; // Coordonata Y a locului de parcare

    public ParkingSpotDTO(Long id, boolean occupied, int x, int y, LocalDateTime reservationTime) {
        this.id = id;
        this.reserved = occupied;
        this.x = x;
        this.y = y;
        this.reservationTime = reservationTime;
    }
    public ParkingSpotDTO(Long id, boolean reserved, int x, int y, LocalDateTime reservationTime, Long parkingLotId) {
        this.id = id;
        this.reserved = reserved;
        this.x = x;
        this.y = y;
        this.reservationTime = reservationTime;
        this.parkingLotId = parkingLotId;
    }
}