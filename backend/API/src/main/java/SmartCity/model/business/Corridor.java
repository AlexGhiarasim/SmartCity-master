package SmartCity.model.business;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "corridors",schema="smartcity")
public class Corridor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "parking_lot_id", nullable = false)
    private ParkingLot parkingLot;

    @Column(nullable = false)
    private int startX; // Coordonata X de start a coridorului

    @Column(nullable = false)
    private int startY; // Coordonata Y de start a coridorului

    @Column(nullable = false)
    private int endX; // Coordonata X de final a coridorului

    @Column(nullable = false)
    private int endY; // Coordonata Y de final a coridorului

    public Corridor(int startX, int startY, int endX, int endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }
}
