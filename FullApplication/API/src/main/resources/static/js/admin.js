document.addEventListener('DOMContentLoaded', function () {
    const token = getCookie('token');

    // Funcție pentru a obține datele și a popula lista de parcări
    function fetchDataAndPopulateParkingList() {
        fetch('http://localhost:8666/api/v1/parkinglot/all', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var parkingList = document.querySelector('.parking-list');
            parkingList.innerHTML = '';
            
            // Iterăm prin fiecare nume de parcare din datele primite și le adăugăm la lista HTML
            data.forEach(function(parkingName) {
                var parkingItem = document.createElement('div');
                parkingItem.classList.add('parking-item');
                
                // Creăm butonul de modificare
                var modifyBtn = document.createElement('button');
                modifyBtn.classList.add('modify-parking-btn');
                modifyBtn.textContent = 'Modifică';
                
                // Creăm butonul de ștergere pentru parcări
                var deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-parking-btn');
                deleteBtn.textContent = 'Șterge';
                
                // Adăugăm numele parcării într-un element span
                var span = document.createElement('span');
                span.textContent = parkingName;
                
                // Adăugăm elementele create în elementul parinte (parkingItem)
                parkingItem.appendChild(span);
                parkingItem.appendChild(modifyBtn);
                parkingItem.appendChild(deleteBtn);
                
                // Adăugăm elementul parinte în lista de parcări
                parkingList.appendChild(parkingItem);
            });

            // După ce am populat lista de parcări, asociem evenimentele pentru butoanele de modificare și ștergere
            associateEventsWithButtons();
        })
        .catch(error => console.error('Error:', error));
    }

    // Funcție pentru a asocia evenimentele cu butoanele de modificare și ștergere
    function associateEventsWithButtons() {
        var modifyParkingBtns = document.querySelectorAll('.modify-parking-btn');
        var deleteParkingBtns = document.querySelectorAll('.delete-parking-btn');
        var parkingModal = document.getElementById('parking-modal');
        var parkingCloseBtn = document.querySelector('#parking-modal .close');
        var parkingDeleteModal = document.getElementById('parking-delete-modal'); // Modalul pentru ștergerea parcării
        var parkingDeleteCloseBtn = document.querySelector('#parking-delete-modal .close');
        var confirmDeleteParkingBtn = document.getElementById('confirm-delete-parking-btn'); // Butonul pentru confirmarea ștergerii parcării

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
                parkingDeleteModal.style.display = 'block'; // Afișăm modalul pentru ștergerea parcării
            });
        });

        parkingDeleteCloseBtn.addEventListener('click', function () {
            parkingDeleteModal.style.display = 'none';
        });

        confirmDeleteParkingBtn.addEventListener('click', function () {
            var parkingItem = document.querySelector('.parking-item');
            if (parkingItem) {
                parkingItem.remove();
            }
            parkingDeleteModal.style.display = 'none';
        });

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
    }

    // Apelăm funcția pentru a obține datele și a popula lista de parcări
    fetchDataAndPopulateParkingList();
});

// Funcție pentru a obține valoarea unui cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}
