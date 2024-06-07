class Wall {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}

class Road {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const parkingGrid = document.getElementById("parking-grid");
    const N = 15;
    const M = 20;
    const x = 80;
    const baseN = 10;
    const baseM = 10;

    const cellSize = Math.min((x * baseN) / N, (x * baseM) / M);

    parkingGrid.style.gridTemplateRows = `repeat(${N}, ${cellSize}px)`;
    parkingGrid.style.gridTemplateColumns = `repeat(${M}, ${cellSize}px)`;

    const matrix = Array.from({ length: N }, () => Array(M).fill('P'));
    const wallList = [
        new Wall(0, 0, 0, 19),
        new Wall(0, 0, 14, 0),
        new Wall(14, 1, 14, 19),
        new Wall(1, 19, 14, 19),
        new Wall(13, 3, 13, 16),
    ];

    const roadList = [
        new Road(2, 2, 2, 17),
        new Road(1, 2, 14, 2),
        new Road(1, 17, 14, 17),
        new Road(5, 3, 5, 16),
        new Road(8, 3, 8, 16),
        new Road(11, 3, 11, 16)
    ];

    wallList.forEach(wall => {
        if (wall.x1 === wall.x2) {
            for (let y = wall.y1; y <= wall.y2; y++) {
                if (wall.x1 >= 0 && wall.x1 < N && y >= 0 && y < M) {
                    matrix[wall.x1][y] = 'Z';
                }
            }
        } else if (wall.y1 === wall.y2) {
            for (let x = wall.x1; x <= wall.x2; x++) {
                if (x >= 0 && x < N && wall.y1 >= 0 && wall.y1 < M) {
                    matrix[x][wall.y1] = 'Z';
                }
            }
        }
    });

    roadList.forEach(road => {
        if (road.x1 === road.x2) {
            for (let y = road.y1; y <= road.y2; y++) {
                if (road.x1 >= 0 && road.x1 < N && y >= 0 && y < M) {
                    matrix[road.x1][y] = 'D';
                }
            }
        } else if (road.y1 === road.y2) {
            for (let x = road.x1; x <= road.x2; x++) {
                if (x >= 0 && x < N && road.y1 >= 0 && road.y1 < M) {
                    matrix[x][road.y1] = 'D';
                }
            }
        }
    });

    const images = {
        'P': '../public/img/ParkingAssets/imagine1.jfif',
        'D': '../public/img/ParkingAssets/road.png',
        'Z': '../public/img/ParkingAssets/wall.png'
    };

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement('div');
            const img = document.createElement('img');
            if (matrix[i][j] === 'P') {
                cell.style.cursor = 'pointer';
                cell.addEventListener('mouseenter', function () {
                    img.classList.add('highlight');
                });
                cell.addEventListener('mouseleave', function () {
                    img.classList.remove('highlight');
                });
                cell.addEventListener('click', function (event) {
                    showSmallModal(event);
                });
            }
            img.src = images[matrix[i][j]];
            cell.appendChild(img);
            parkingGrid.appendChild(cell);
        }
    }

    const modal = document.getElementById("parking-modal");
    const btn = document.getElementById("select-parking-btn");
    const span = document.getElementsByClassName("close")[0];
    const parkingOptions = document.getElementsByClassName("parking-option");

    btn.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }
    Array.from(parkingOptions).forEach(option => {
        option.onclick = function () {
            modal.style.display = "none";
        }
    });

    const smallModal1 = document.getElementById("small-modal1");
    const span1 = document.getElementsByClassName("small-close1")[0];

    function showSmallModal(event) {
        const rect = event.target.getBoundingClientRect();
        smallModal1.style.display = "block";
        smallModal1.style.left = `${rect.left + window.scrollX}px`;
        smallModal1.style.top = `${rect.bottom + window.scrollY}px`;
    }

    span1.onclick = function () {
        smallModal1.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == smallModal1) {
            smallModal1.style.display = "none";
        } else if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const selectLocBtn = document.getElementById("select-loc-btn");

    selectLocBtn.onclick = function () {
        smallModal1.style.display = "none";
        let rX = -1;
        let rY = -1;
        let foundR = false;

        for (let i = 0; i < N && !foundR; i++) {
            if (matrix[i][0] === 'D') {
                foundR = true;
                rX = i;
                rY = 0;
            } else if (matrix[i][M - 1] === 'D') {
                foundR = true;
                rX = i;
                rY = M - 1;
            }
        }

        for (let j = 0; j < M && !foundR; j++) {
            if (matrix[0][j] === 'D') {
                foundR = true;
                rX = 0;
                rY = j;
            } else if (matrix[N - 1][j] === 'D') {
                foundR = true;
                rX = N - 1;
                rY = j;
            }
        }
        console.log(foundR);
        if (foundR) {
            const newImg = document.createElement('img');
            newImg.src = '../public/img/ParkingAssets/imagine1.jfif';
            newImg.style.width = '100%';
            newImg.style.height = '100%';

            const cell = parkingGrid.children[rX * M + rY];
            cell.innerHTML = '';
            cell.appendChild(newImg);
            const shortestPathMatrix = Array.from({ length: N }, () => Array(M).fill(0));

            // Implementăm un algoritm de căutare în lățime (BFS) pentru a găsi cel mai scurt drum
            const queue = [{ x: rX, y: rY }];
            shortestPathMatrix[rX][rY] = 1; // Marcam locul de parcare selectat cu 1 în matricea de drumuri

            while (queue.length > 0) {
                const current = queue.shift();
                const neighbors = getNeighbors(current.x, current.y);

                neighbors.forEach(neighbor => {
                    const nx = neighbor.x;
                    const ny = neighbor.y;
                    if (nx >= 0 && nx < N && ny >= 0 && ny < M && shortestPathMatrix[nx][ny] === 0) {
                        shortestPathMatrix[nx][ny] = 1;
                        queue.push({ x: nx, y: ny });
                    }
                });
            }

            // Afisam matricea cu cel mai scurt drum in consola
            console.log(shortestPathMatrix);
        }
    }

    function getNeighbors(x, y) {
        const neighbors = [];
        if (x - 1 >= 0) neighbors.push({ x: x - 1, y });
        if (x + 1 < N) neighbors.push({ x: x + 1, y });
        if (y - 1 >= 0) neighbors.push({ x, y: y - 1 });
        if (y + 1 < M) neighbors.push({ x, y: y + 1 });
        return neighbors;
    }

});

class Wall {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}

class Road {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const parkingGrid = document.getElementById("parking-grid");
    const N = 15; 
    const M = 20;
    const x = 90; 
    const baseN = 10;
    const baseM = 10;
    
    const cellSize = Math.min((x * baseN) / N, (x * baseM) / M);
    
    parkingGrid.style.gridTemplateRows = `repeat(${N}, ${cellSize}px)`;
    parkingGrid.style.gridTemplateColumns = `repeat(${M}, ${cellSize}px)`;
    
    const matrix = Array.from({ length: N }, () => Array(M).fill('P'));
    const wallList = [
        new Wall(0, 0, 0, 19),
        new Wall(0, 0, 14, 0),
        new Wall(14, 1, 14, 19),
        new Wall(1,19,14,19),
        new Wall(13,3,13,16),
    ];
    
    const roadList = [
        new Road(2, 2, 2, 17),
        new Road(1, 2, 14, 2),
        new Road(1, 17, 14, 17),
        new Road(5, 3, 5, 16),
        new Road(8, 3, 8, 16),
        new Road(11, 3, 11, 16)
    ];
    
    wallList.forEach(wall => {
        if (wall.x1 === wall.x2) {
            for (let y = wall.y1; y <= wall.y2; y++) {
                if (wall.x1 >= 0 && wall.x1 < N && y >= 0 && y < M) {
                    matrix[wall.x1][y] = 'Z';
                }
            }
        } else if (wall.y1 === wall.y2) {
            for (let x = wall.x1; x <= wall.x2; x++) {
                if (x >= 0 && x < N && wall.y1 >= 0 && wall.y1 < M) {
                    matrix[x][wall.y1] = 'Z';
                }
            }
        }
    });

    roadList.forEach(road => {
        if (road.x1 === road.x2) {
            for (let y = road.y1; y <= road.y2; y++) {
                if (road.x1 >= 0 && road.x1 < N && y >= 0 && y < M) {
                    matrix[road.x1][y] = 'D';
                }
            }
        } else if (road.y1 === road.y2) {
            for (let x = road.x1; x <= road.x2; x++) {
                if (x >= 0 && x < N && road.y1 >= 0 && road.y1 < M) {
                    matrix[x][road.y1] = 'D';
                }
            }
        }
    });

    const images = {
        'P': '../public/img/ParkingAssets/imagine1.jfif',
        'D': '../public/img/ParkingAssets/road.png',
        'Z': '../public/img/ParkingAssets/wall.png'
    };

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement('div');
            const img = document.createElement('img');
            img.src = images[matrix[i][j]];
            cell.appendChild(img);
            parkingGrid.appendChild(cell);
        }
    }

    const modal = document.getElementById("parking-modal");
    const btn = document.getElementById("select-parking-btn");
    const span = document.getElementsByClassName("close")[0];
    const parkingOptions = document.getElementsByClassName("parking-option");

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    Array.from(parkingOptions).forEach(option => {
        option.onclick = function() {
            modal.style.display = "none";
        }
    });
});
