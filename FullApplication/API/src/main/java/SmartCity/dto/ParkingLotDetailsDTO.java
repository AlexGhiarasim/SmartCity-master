package SmartCity.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ParkingLotDetailsDTO {
    private Long id;
    private String name;
    private int x;
    private int y;
    private List<ParkingSpotDTO> parkingSpots;
    private List<WallDTO> walls;
    private List<CorridorDTO> corridors;

}