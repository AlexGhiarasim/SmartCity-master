document.addEventListener('DOMContentLoaded', function () {
    // Parking modal
    var parkingModal = document.getElementById('parking-modal');
    var parkingCloseBtn = document.querySelector('#parking-modal .close');
    var modifyParkingBtns = document.querySelectorAll('.modify-parking-btn');
    var deleteParkingBtns = document.querySelectorAll('.delete-parking-btn');

    modifyParkingBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            parkingModal.style.display = 'block';
        });
    });

    parkingCloseBtn.addEventListener('click', function () {
        parkingModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === parkingModal) {
            parkingModal.style.display = 'none';
        }
    });

    deleteParkingBtns.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            var parkingItem = event.target.closest('.parking-item');
            parkingItem.remove();
        });
    });

    // User modal
    var userModal = document.getElementById('user-modal');
    var userCloseBtn = document.querySelector('#user-modal .close');
    var deleteUserBtns = document.querySelectorAll('.delete-user-btn');

    deleteUserBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            userModal.style.display = 'block';
        });
    });

    userCloseBtn.addEventListener('click', function () {
        userModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === userModal) {
            userModal.style.display = 'none';
        }
    });

    var confirmDeleteUserBtn = document.getElementById('confirm-delete-user-btn');
    confirmDeleteUserBtn.addEventListener('click', function () {
        var userItem = document.querySelector('.user-item');
        if (userItem) {
            userItem.remove();
        }
        userModal.style.display = 'none';
    });
});
