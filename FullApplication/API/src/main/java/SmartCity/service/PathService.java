package SmartCity.service;

import SmartCity.dto.PathRequestDTO;
import SmartCity.dto.PathResponseDTO;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.Queue;

@Service
public class PathService {

    public int[][] findShortestPath(int[][] matrix, int startX, int startY, int endX, int endY) {
//        System.out.println("333333333333333333333333");
        int rows = matrix.length;
        int cols = matrix[0].length;
        boolean[][] visited = new boolean[rows][cols];
//        System.out.println("2222222222222222222");
        int[][] parent = new int[rows * cols][2];
        int[][] directions = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};
        Queue<int[]> queue = new LinkedList<>();
        queue.add(new int[]{startX, startY});
        visited[startX][startY] = true;

        boolean found = false;
        while (!queue.isEmpty() && !found) {
            int[] current = queue.poll();
            int x = current[0];
            int y = current[1];

            for (int[] direction : directions) {
                int newX = x + direction[0];
                int newY = y + direction[1];
                if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && matrix[newX][newY] == 1 && !visited[newX][newY]) {
                    queue.add(new int[]{newX, newY});
                    visited[newX][newY] = true;
                    parent[newX * cols + newY] = new int[]{x, y};
                    if (newX == endX && newY == endY) {
                        found = true;
                        break;
                    }
                }
            }
        }

        int[][] path = new int[rows][cols];
        if (found) {
            int x = endX;
            int y = endY;
            while (x != startX || y != startY) {
                path[x][y] = 1;
                int[] prev = parent[x * cols + y];
                x = prev[0];
                y = prev[1];
            }
            path[startX][startY] = 1;
        }
//        System.out.println("111111111111111111111111111111");
//        System.out.println(path);
        return path;
    }
}
