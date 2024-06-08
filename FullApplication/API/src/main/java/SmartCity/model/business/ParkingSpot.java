package SmartCity.model.business;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "parking_spots",schema="smartcity")
public class ParkingSpot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private boolean occupied;

    @ManyToOne
    @JoinColumn(name = "parking_lot_id", nullable = false)
    private ParkingLot parkingLot;

    @Column(nullable = false)
    private int x; // Coordonata X a locului de parcare

    @Column(nullable = false)
    private int y; // Coordonata Y a locului de parcare

}
