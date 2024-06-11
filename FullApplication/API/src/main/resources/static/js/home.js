

document.addEventListener("DOMContentLoaded", function () {

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

        const cellId = event.target.id || event.target.parentElement.id; 
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
                    finalImg.src = '../static/img/ParkingAssets/imagine1.jfif';
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
    };
    
});
