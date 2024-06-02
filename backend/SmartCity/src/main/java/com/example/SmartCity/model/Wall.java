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
@Table(name = "walls",schema="smartcity")
public class Wall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "parking_lot_id", nullable = false)
    private ParkingLot parkingLot;

    @Column(nullable = false)
    private int startX; // Coordonata X de start a zidului

    @Column(nullable = false)
    private int startY; // Coordonata Y de start a zidului

    @Column(nullable = false)
    private int endX; // Coordonata X de final a zidului

    @Column(nullable = false)
    private int endY; // Coordonata Y de final a zidului

}
