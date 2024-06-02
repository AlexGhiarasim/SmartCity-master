package com.example.SmartCity.repository;

import com.example.SmartCity.model.Corridor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CorridorRepository extends JpaRepository<Corridor, Long> {
}
