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

class ParkingSpot {
    constructor(x, y, reserved) {
        this.x = x;
        this.y = y;
        this.reserved = reserved;
    }
}

let xFinish = -1
let yFinish = -1
let selectedPlace = false;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("select-parking-btn").addEventListener("click", function () {
        const token = getCookie('token');

        fetch("http://localhost:8666/api/v1/parkinglot/all", {
            headers: {
                'Authorization': token,
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("Datele primite de la server:", data);
            
                var parkingOptionsContainer = document.getElementById("parking-options");
                parkingOptionsContainer.innerHTML = ""; 
            
                data.forEach(function (parkingLot, index) {
                    var button = document.createElement("button");
                    button.className = "parking-option";
                    
                    var prefixedId = "parking-" + parkingLot.id;
            
                    button.textContent = parkingLot.name;
                    button.dataset.index = index + 1;
            
                    button.id = prefixedId;
                    button.addEventListener('click', function() {
                        console.log("S-a făcut click pe parcul cu id:", prefixedId);
                    });
            
                    parkingOptionsContainer.appendChild(button);
                });
            
                document.getElementById("parking-modal").style.display = "block";
            })
            
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    });

    document.querySelector("#parking-modal .close").addEventListener("click", function () {
        document.getElementById("parking-modal").style.display = "none";
    });

    window.addEventListener("click", function (event) {
        var modal = document.getElementById("parking-modal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    document.addEventListener("click", function (event) {
        if (event.target && event.target.className == "parking-option") {

            var selectedParkingLot = event.target.textContent;
            var selectedIndex = event.target.dataset.index;

            var numeParcareDiv = document.querySelector('.NumeParcare');
            numeParcareDiv.textContent = selectedParkingLot;
            console.log("Selected parking lot:", selectedParkingLot, "Index:", selectedIndex);

            // Fetch details of the selected parking lot
            const token = getCookie('token');
            fetch(`http://localhost:8666/api/v1/parkinglot/${selectedIndex}`, {
                headers: {
                    'Authorization': token,
                }
            })
                .then(response => response.json()) // Parse the response as JSON
                .then(data => {
                    const parkingGrid = document.getElementById("parking-grid");
                    parkingGrid.innerHTML = "";

                    const N = data.x;
                    const M = data.y;
                    const valCalc = 87;
                    const baseN = 10;
                    const baseM = 10;

                    const cellSize = Math.min((valCalc * baseN) / N, (valCalc * baseM) / M);

                    parkingGrid.style.gridTemplateRows = `repeat(${N}, ${cellSize}px)`;
                    parkingGrid.style.gridTemplateColumns = `repeat(${M}, ${cellSize}px)`;

                    const matrix = Array.from({ length: N }, () => Array(M).fill('P'));
                    console.log(data);
                    const wallList = data.walls.map(wall => new Wall(wall.startX, wall.startY, wall.endX, wall.endY));
                    const roadList = data.corridors.map(road => new Road(road.startX, road.startY, road.endX, road.endY));
                    const parkingSpotLists = data.parkingSpots.map(parkingSpot => new ParkingSpot(parkingSpot.x, parkingSpot.y, parkingSpot.reserved));

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

                    for (let elem of parkingSpotLists) {
                        if (!elem.reserved)
                            matrix[elem.x][elem.y] = 'P';
                        else
                            matrix[elem.x][elem.y] = 'O';
                    }

                    const images = {
                        'P': '../static/img/ParkingAssets/parkingLot.png',
                        'D': '../static/img/ParkingAssets/road.png',
                        'Z': '../static/img/ParkingAssets/wall.png',
                        'O': '../static/img/ParkingAssets/occupied.jfif'
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
                            } else if (matrix[i][j] === 'O') {
                                cell.style.cursor = 'pointer';
                                cell.addEventListener('mouseenter', function () {
                                    img.classList.add('highlight');
                                });
        
                                cell.addEventListener('mouseleave', function () {
                                    img.classList.remove('highlight');
                                });
                                cell.addEventListener('click', function (event) {
                                    showOccupiedModal();
                                });
                            }
                            img.src = images[matrix[i][j]];
                            cell.appendChild(img);

                            cell.setAttribute('id', `${i}-${j}`);
                            parkingGrid.appendChild(cell);
                        }
                    }


                    const occupiedModal = document.getElementById('occupied-modal');
                    const occupiedText = document.getElementById('occupied-text');
                    const closeBtn = document.querySelector('.close');

                    function showOccupiedModal() {
                        occupiedModal.style.display = 'block';
                    }

                    function hideOccupiedModal() {
                        occupiedModal.style.display = 'none';
                    }

                    closeBtn.addEventListener('click', hideOccupiedModal);

                    window.addEventListener('click', function (event) {
                        if (event.target == occupiedModal) {
                            hideOccupiedModal();
                        }
                    });

                    const smallModal1 = document.getElementById("small-modal1");
                    const span1 = document.getElementsByClassName("small-close1")[0];

                    function showSmallModal(event) {
                        const rect = event.target.getBoundingClientRect();
                        smallModal1.style.display = "block";
                        smallModal1.style.left = `${rect.left + window.scrollX}px`;
                        smallModal1.style.top = `${rect.bottom + window.scrollY}px`;

                        const cellId = event.target.id || event.target.parentElement.id;
                        console.log(cellId + " id")

                        const [x, y] = cellId.split('-');

                        xFinish = parseInt(x);
                        yFinish = parseInt(y);
                    }

                    span1.onclick = function () {
                        smallModal1.style.display = "none";
                    }

                    window.addEventListener('click', function(event) {
                        if (event.target === smallModal1) {
                            smallModal1.style.display = "none";
                        }
                    });
                    
                    const selectLocBtn = document.getElementById("select-loc-btn");

                    selectLocBtn.onclick = function () {
                        smallModal1.style.display = "none";


                        const data1 = {
                            parkingLotId: 1, 
                            x: xFinish,             
                            y: yFinish   
                        };
                        fetch('http://localhost:8666/api/v1/parkinglot/reserve', {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': token
                            },
                            body: JSON.stringify(data1)
                        })
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            }
                            throw new Error('Nu s-a putut rezerva locul de parcare.');
                        })
                        .then(data => {
                            alert('Locul de parcare a fost rezervat cu succes!', data);

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
                            up: '../static/img/ParkingAssets/carOnRoad/carUp.jfif',
                            down: '../static/img/ParkingAssets/carOnRoad/carDown.jfif',
                            left: '../static/img/ParkingAssets/carOnRoad/carLeft.jfif',
                            right: '../static/img/ParkingAssets/carOnRoad/carRight.jfif'
                        };

                        const directionsCar = [
                            { dx: -1, dy: 0, img: carImages.up }, // sus
                            { dx: 1, dy: 0, img: carImages.down },  // jos
                            { dx: 0, dy: -1, img: carImages.left }, // stânga
                            { dx: 0, dy: 1, img: carImages.right }   // dreapta
                        ];

                        let ShortestPathMatrix = [
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
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
                                    prevCell.innerHTML = '';
                                    const prevImg = document.createElement('img');
                                    prevImg.src = '../static/img/ParkingAssets/road.png';
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
                                    finalImg.src = '../static/img/ParkingAssets/occupied.jfif';
                                    finalImg.style.width = '100%';
                                    finalImg.style.height = '100%';
                                    finalCell.innerHTML = '';
                                    finalCell.appendChild(finalImg);
                                    carImg.src = '../static/img/ParkingAssets/road.png';
                                    return;
                                }

                                for (const dir of directionsCar) {
                                    const nextX = currentX + dir.dx;
                                    const nextY = currentY + dir.dy;
                                    if (nextX >= 0 && nextX < ShortestPathMatrix.length &&
                                        nextY >= 0 && nextY < ShortestPathMatrix[nextX].length &&
                                        ShortestPathMatrix[nextX][nextY] === 1) {
                                        prevX = currentX;
                                        prevY = currentY;
                                        currentX = nextX;
                                        currentY = nextY;
                                        carImg.src = dir.img;
                                        break;
                                    }
                                }
                            }

                            const carMovementInterval = setInterval(moveCar, 500);
                        }
                        })
                        .catch(error => {
                            console.error('Eroare:', error.message);
                        });
                    };
                })
                .catch(error => {
                    console.error("Error fetching parking lot details:", error);
                });
        }
    });


    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
});
