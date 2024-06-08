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

let xFinish = -1
let yFinish = -1
let selectedPlace = false;

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
        'P': './img/ParkingAssets/parkingLot.png',
        'D': './img/ParkingAssets/road.png',
        'Z': './img/ParkingAssets/wall.png'
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

            cell.setAttribute('id', `${i}-${j}`);

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

        const cellId = event.target.id || event.target.parentElement.id; // Verifică id-ul imaginii sau a div-ului părinte
        console.log(cellId + " id")

        const [x, y] = cellId.split('-');

        xFinish = parseInt(x);
        yFinish = parseInt(y);
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



    //  SELECT LOC PARCARE SI INITIEREA DRUMULUI

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
    
        const mybody = {
            xStart: rX,
            yStart: rY,
            xFinish: xFinish,
            yFinish: yFinish
        };
    
        let final = false;
        let currentX = mybody.xStart;
        let currentY = mybody.yStart;
        let prevX = null;
        let prevY = null;
    
        const carImages = {
            up: './img/ParkingAssets/carOnRoad/carUp.jfif',
            down: './img/ParkingAssets/carOnRoad/carDown.jfif',
            left: './img/ParkingAssets/carOnRoad/carLeft.jfif',
            right: './img/ParkingAssets/carOnRoad/carRight.jfif'
        };
    
        const directionsCar = [
            { dx: -1, dy: 0, img: carImages.up }, // sus
            { dx: 1, dy: 0, img: carImages.down },  // jos
            { dx: 0, dy: -1, img: carImages.left }, // stânga
            { dx: 0, dy: 1, img: carImages.right }   // dreapta
        ];
    
        let ShortestPathMatrix = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    
        if (foundR) {
            const newImg = document.createElement('img');
    
            function moveCar() {
                for (let i = 0; i < ShortestPathMatrix.length; i++) {
                    for (let j = 0; j < ShortestPathMatrix[i].length; j++) {
                        if (ShortestPathMatrix[i][j] === 1) {
                            const cellIndex = i * M + j;
                            const cell = parkingGrid.children[cellIndex];
                            cell.style.opacity = '1';
                        }
                    }
                }
    
                if (prevX !== null && prevY !== null) {
                    const prevCellIndex = prevX * M + prevY;
                    const prevCell = parkingGrid.children[prevCellIndex];
                    prevCell.innerHTML = ''; // Șterge conținutul celulei anterioare
                    const prevImg = document.createElement('img');
                    prevImg.src = './img/ParkingAssets/road.png'; // Înlocuiește cu calea către imaginea corespunzătoare
                    prevImg.style.width = '100%';
                    prevImg.style.height = '100%';
                    prevCell.appendChild(prevImg);
                }
    
                ShortestPathMatrix[currentX][currentY] = 0;
    
                const currentCellIndex = currentX * M + currentY;
                const currentCell = parkingGrid.children[currentCellIndex];
    
                let carImg = document.createElement('img');
                carImg.style.width = '100%';
                carImg.style.height = '100%';
                currentCell.innerHTML = '';
                currentCell.appendChild(carImg);
    
                if ((currentX === mybody.xFinish && Math.abs(currentY - mybody.yFinish) === 1) ||
                    (currentY === mybody.yFinish && Math.abs(currentX - mybody.xFinish) === 1)) {
                    clearInterval(carMovementInterval);
                    const finalCellIndex = mybody.xFinish * M + mybody.yFinish;
                    const finalCell = parkingGrid.children[finalCellIndex];
                    const finalImg = document.createElement('img');
                    finalImg.src = './img/ParkingAssets/imagine1.jfif'; 
                    finalImg.style.width = '100%';
                    finalImg.style.height = '100%';
                    finalCell.innerHTML = '';
                    finalCell.appendChild(finalImg);
                    carImg.src = './img/ParkingAssets/road.png'; 
                    return;
                }
    
                for (const dir of directionsCar) {
                    const nextX = currentX + dir.dx;
                    const nextY = currentY + dir.dy;
                    if (nextX >= 0 && nextX < ShortestPathMatrix.length &&
                        nextY >= 0 && nextY < ShortestPathMatrix[nextX].length &&
                        ShortestPathMatrix[nextX][nextY] === 1) {
                        prevX = currentX; // Actualizează poziția anterioară
                        prevY = currentY;
                        currentX = nextX;
                        currentY = nextY;
                        carImg.src = dir.img; // Setează imaginea mașinii pe baza direcției
                        break;
                    }
                }
            }
    
            const carMovementInterval = setInterval(moveCar, 500);
        }
    };
    
});
