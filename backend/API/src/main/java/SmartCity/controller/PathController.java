package SmartCity.controller;

import SmartCity.dto.PathRequestDTO;
import SmartCity.dto.PathResponseDTO;
import SmartCity.service.PathService;
import nonapi.io.github.classgraph.json.JSONUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/path")
public class PathController {

    @Autowired
    private PathService pathFindingService;

    @PostMapping("/find")
    public ResponseEntity<PathResponseDTO> findShortestPath(@RequestBody PathRequestDTO pathRequestDTO) {
        int[][] shortestPathMatrix = pathFindingService.findShortestPath(
                pathRequestDTO.getMatrix(),
                pathRequestDTO.getStartX(),
                pathRequestDTO.getStartY(),
                pathRequestDTO.getEndX(),
                pathRequestDTO.getEndY()
        );
//    System.out.println(pathRequestDTO.getStartX());
        PathResponseDTO responseDTO = new PathResponseDTO();
        responseDTO.setPathMatrix(shortestPathMatrix);

        return ResponseEntity.ok(responseDTO);
    }
}
