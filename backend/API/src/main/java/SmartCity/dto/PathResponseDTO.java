package SmartCity.dto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class PathResponseDTO {
    private int[][] pathMatrix;

    // Constructor
    public PathResponseDTO(int[][] pathMatrix) {
        this.pathMatrix = pathMatrix;
    }

    // Getters and Setters
    public int[][] getPathMatrix() {
        return pathMatrix;
    }

    public void setPathMatrix(int[][] pathMatrix) {
        this.pathMatrix = pathMatrix;
    }
}
