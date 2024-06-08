package SmartCity.service;

import SmartCity.dto.WallDTO;
import SmartCity.model.business.Wall;
import SmartCity.repository.WallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WallService {

    @Autowired
    private WallRepository wallRepository;

    public WallDTO createWall(WallDTO wallDTO) {
        Wall wall = new Wall();
        wall.setStartX(wallDTO.getStartX());
        wall.setStartY(wallDTO.getStartY());
        wall.setEndX(wallDTO.getEndX());
        wall.setEndY(wallDTO.getEndY());

        Wall savedWall = wallRepository.save(wall);
        return new WallDTO(savedWall.getId(), savedWall.getStartX(), savedWall.getStartY(), savedWall.getEndX(), savedWall.getEndY());
    }

    public List<WallDTO> getAllWalls() {
        return wallRepository.findAll().stream()
                .map(wall -> new WallDTO(wall.getId(), wall.getStartX(), wall.getStartY(), wall.getEndX(), wall.getEndY()))
                .collect(Collectors.toList());
    }

    public WallDTO getWallById(Long id) {
        Optional<Wall> wallOptional = wallRepository.findById(id);
        return wallOptional.map(wall -> new WallDTO(wall.getId(), wall.getStartX(), wall.getStartY(), wall.getEndX(), wall.getEndY())).orElse(null);
    }

    public WallDTO updateWall(Long id, WallDTO wallDTO) {
        Optional<Wall> wallOptional = wallRepository.findById(id);
        if (wallOptional.isPresent()) {
            Wall wall = wallOptional.get();
            wall.setStartX(wallDTO.getStartX());
            wall.setStartY(wallDTO.getStartY());
            wall.setEndX(wallDTO.getEndX());
            wall.setEndY(wallDTO.getEndY());

            Wall updatedWall = wallRepository.save(wall);
            return new WallDTO(updatedWall.getId(), updatedWall.getStartX(), updatedWall.getStartY(), updatedWall.getEndX(), updatedWall.getEndY());
        }
        return null;
    }

    public void deleteWall(Long id) {
        wallRepository.deleteById(id);
    }
}
