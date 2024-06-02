package com.example.SmartCity.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

}
