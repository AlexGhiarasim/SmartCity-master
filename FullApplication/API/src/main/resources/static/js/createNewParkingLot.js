document.addEventListener('DOMContentLoaded', function () {
    const createParkingBtn = document.getElementById('create-parking-btn');
    const createParkingModal = document.getElementById('create-parking-modal');
    const closeCreateParkingModal = document.querySelector('#create-parking-modal .close');
    const saveCreateParkingBtn = document.getElementById('save-create-parking-btn');

    // Deschide modalul pentru crearea unei parcări noi
    createParkingBtn.addEventListener('click', function () {
        createParkingModal.style.display = 'block';
    });

    // Închide modalul pentru crearea unei parcări noi
    closeCreateParkingModal.addEventListener('click', function () {
        createParkingModal.style.display = 'none';
    });

    // Închide modalul când utilizatorul dă clic în afara acestuia
    window.addEventListener('click', function (event) {
        if (event.target === createParkingModal) {
            createParkingModal.style.display = 'none';
        }
    });

    // Salvează detaliile despre parcarea nouă și închide modalul
    saveCreateParkingBtn.addEventListener('click', function () {
        const parkingSize = document.getElementById('parking-size').value;
        const wallIntervals = document.getElementById('wall-intervals').value;
        const roadIntervals = document.getElementById('road-intervals').value;

        // Poți trimite aceste date către server sau să le procesezi în alt mod
        console.log('Numărul de locuri de parcare:', parkingSize);
        console.log('Intervale pentru ziduri:', wallIntervals);
        console.log('Intervale pentru drumuri:', roadIntervals);

        createParkingModal.style.display = 'none';
    });
});
