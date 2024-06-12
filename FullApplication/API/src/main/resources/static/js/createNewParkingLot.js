document.addEventListener('DOMContentLoaded', function () {
    const createParkingBtn = document.getElementById('create-parking-btn');
    const createParkingModal = document.getElementById('create-parking-modal');
    const closeCreateParkingModal = document.querySelector('#create-parking-modal .close');
    const saveCreateParkingBtn = document.getElementById('save-create-parking-btn');

    createParkingBtn.addEventListener('click', function () {
        createParkingModal.style.display = 'block';
    });

    closeCreateParkingModal.addEventListener('click', function () {
        createParkingModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === createParkingModal) {
            createParkingModal.style.display = 'none';
        }
    });

    saveCreateParkingBtn.addEventListener('click', function () {
        const parkingSize = document.getElementById('parking-size').value;
        const wallIntervals = document.getElementById('wall-intervals').value;
        const roadIntervals = document.getElementById('road-intervals').value;

        console.log('Numărul de locuri de parcare:', parkingSize);
        console.log('Intervale pentru ziduri:', wallIntervals);
        console.log('Intervale pentru drumuri:', roadIntervals);

        createParkingModal.style.display = 'none';
    });
});
