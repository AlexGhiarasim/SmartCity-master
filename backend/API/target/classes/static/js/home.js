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

document.addEventListener("DOMContentLoaded", async()=> {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/index.html';
    } else {
        const response = await fetch('/home', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            window.location.href = '/index.html';
        } else {
            const data = await response.json();
            // Do something with the data
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
                'P': '/img/ParkingAssets/imagine1.jfif',
                'D': '/img/ParkingAssets/road.png',
                'Z': '/img/ParkingAssets/wall.png'
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
        }
    }


});
