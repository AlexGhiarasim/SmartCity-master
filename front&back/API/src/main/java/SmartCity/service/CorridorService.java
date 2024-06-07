package SmartCity.service;

import SmartCity.dto.CorridorDTO;
import SmartCity.model.business.Corridor;
import SmartCity.repository.CorridorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CorridorService {

    @Autowired
    private CorridorRepository corridorRepository;

    public CorridorDTO createCorridor(CorridorDTO corridorDTO) {
        Corridor corridor = new Corridor();
        corridor.setStartX(corridorDTO.getStartX());
        corridor.setStartY(corridorDTO.getStartY());
        corridor.setEndX(corridorDTO.getEndX());
        corridor.setEndY(corridorDTO.getEndY());

        Corridor savedCorridor = corridorRepository.save(corridor);
        return new CorridorDTO(savedCorridor.getId(), savedCorridor.getStartX(), savedCorridor.getStartY(), savedCorridor.getEndX(), savedCorridor.getEndY());
    }

    public List<CorridorDTO> getAllCorridors() {
        return corridorRepository.findAll().stream()
                .map(corridor -> new CorridorDTO(corridor.getId(), corridor.getStartX(), corridor.getStartY(), corridor.getEndX(), corridor.getEndY()))
                .collect(Collectors.toList());
    }

    public CorridorDTO getCorridorById(Long id) {
        Optional<Corridor> corridorOptional = corridorRepository.findById(id);
        return corridorOptional.map(corridor -> new CorridorDTO(corridor.getId(), corridor.getStartX(), corridor.getStartY(), corridor.getEndX(), corridor.getEndY())).orElse(null);
    }

    public CorridorDTO updateCorridor(Long id, CorridorDTO corridorDTO) {
        Optional<Corridor> corridorOptional = corridorRepository.findById(id);
        if (corridorOptional.isPresent()) {
            Corridor corridor = corridorOptional.get();
            corridor.setStartX(corridorDTO.getStartX());
            corridor.setStartY(corridorDTO.getStartY());
            corridor.setEndX(corridorDTO.getEndX());
            corridor.setEndY(corridorDTO.getEndY());

            Corridor updatedCorridor = corridorRepository.save(corridor);
            return new CorridorDTO(updatedCorridor.getId(), updatedCorridor.getStartX(), updatedCorridor.getStartY(), updatedCorridor.getEndX(), updatedCorridor.getEndY());
        }
        return null;
    }

    public void deleteCorridor(Long id) {
        corridorRepository.deleteById(id);
    }
}
