document.addEventListener('DOMContentLoaded', function () {
    const token = getCookie('token');
    let idToDelete;
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
            
            data.forEach(function(parking) {
                var parkingItem = document.createElement('div');
                parkingItem.classList.add('parking-item');
                
                var modifyBtn = document.createElement('button');
                modifyBtn.classList.add('modify-parking-btn');
                modifyBtn.textContent = 'Modifică';
            
                var deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-parking-btn');
                deleteBtn.textContent = 'Șterge';
                
                var span = document.createElement('span');
                var parkingIdName = "Parcare -" + parking.id + ": " + parking.name;
                span.textContent = parkingIdName;
                
                parkingItem.appendChild(span);
                parkingItem.appendChild(modifyBtn);
                parkingItem.appendChild(deleteBtn);
                
                parkingList.appendChild(parkingItem);
            });

            associateEventsWithButtons();
        })
        .catch(error => console.error('Error:', error));
    }

    function fetchDataAndPopulateUserList() {
        fetch('http://localhost:8666/api/v1/user/all', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var userList = document.querySelector('.user-list');
            userList.innerHTML = '';
            
            data.forEach(function(user) {
                var userItem = document.createElement('div');
                userItem.classList.add('user-item');
                
                var idSpan = document.createElement('span');
                idSpan.textContent = `ID: ${user.id}`;
                userItem.appendChild(idSpan);
    
                // var firstNameSpan = document.createElement('span');
                // firstNameSpan.textContent = `First Name: ${user.firstName || 'N/A'}`;
                // userItem.appendChild(firstNameSpan);
    
                // var lastNameSpan = document.createElement('span');
                // lastNameSpan.textContent = `Last Name: ${user.lastName || 'N/A'}`;
                // userItem.appendChild(lastNameSpan);
    
                var usernameSpan = document.createElement('span');
                usernameSpan.textContent = `Username: ${user.username}`;
                userItem.appendChild(usernameSpan);
    
                var rolesSpan = document.createElement('span');
                var rolesList = user.roles.map(role => role.name).join(', ');
                rolesSpan.textContent = `Roles: ${rolesList}`;
                userItem.appendChild(rolesSpan);
    
                var deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-user-btn');
                deleteBtn.textContent = 'Șterge';
                userItem.appendChild(deleteBtn);
    
                userList.appendChild(userItem);
            });

            associateEventsWithButtons(); 
        })
        .catch(error => console.error('Error:', error));
    }
     
    var parkingDeleteModal = document.getElementById('parking-delete-modal'); 
    function associateEventsWithButtons() {

        var modifyParkingBtns = document.querySelectorAll('.modify-parking-btn');
        var deleteParkingBtns = document.querySelectorAll('.delete-parking-btn');
        var parkingModal = document.getElementById('parking-modal');
        var parkingCloseBtn = document.querySelector('#parking-modal .close');
        var parkingDeleteCloseBtn = document.querySelector('#parking-delete-modal .close');
        var confirmDeleteParkingBtn = document.getElementById('confirm-delete-parking-btn');
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
                var parkingName = parkingItem.querySelector('span').textContent;
                console.log('Se va șterge parcare:', parkingName);
                parkingDeleteModal.style.display = 'block'; 

                var parkingIdMatch = parkingName.match(/\d+/);
                var parkingId = parkingIdMatch ? parkingIdMatch[0] : null;
                confirmDeleteParkingBtn.dataset.parkingId = parkingId;
                confirmDeleteParkingBtn.dataset.parkingItemIndex = Array.from(parkingItem.parentNode.children).indexOf(parkingItem);
            });
        });

        confirmDeleteParkingBtn.addEventListener('click', deleteParkingHandler);

        parkingDeleteCloseBtn.addEventListener('click', function () {
            parkingDeleteModal.style.display = 'none';
        });

        var deleteUserBtns = document.querySelectorAll('.delete-user-btn');
        var userModal = document.getElementById('user-modal');
        var userCloseBtn = document.querySelector('#user-modal .close');
        deleteUserBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var userItem = this.closest('.user-item'); 
                if (userItem) {
                    var userId = userItem.querySelector('span').textContent.split(': ')[1];
                    idToDelete = userId;
                    userModal.style.display = 'block';
                }
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

    }

    fetchDataAndPopulateParkingList();
    fetchDataAndPopulateUserList();
    var userModal = document.getElementById('user-modal');
    var confirmDeleteUserBtn = document.getElementById('confirm-delete-user-btn');
    confirmDeleteUserBtn.addEventListener('click', function () {
        var userItem = document.querySelector('.user-item');
    if (userItem) {
 
        fetch(`http://localhost:8666/api/v1/user/${idToDelete}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token, 
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                fetchDataAndPopulateUserList();
            } else {
                console.error(`Eroare la ștergerea utilizatorului cu ID-ul ${idToDelete}.`);
            }
            userModal.style.display = 'none'; 
        })
        .catch(error => console.error('Error:', error));
    }
        userModal.style.display = 'none';
    });

function deleteParkingHandler() {
    var parkingId = this.dataset.parkingId; 
    var parkingItemIndex = this.dataset.parkingItemIndex;
    console.log("se va sterge:" + parkingId);

    if (parkingId) {
        fetch(`http://localhost:8666/api/v1/parkinglot/${parkingId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {

                var parkingList = document.querySelector('.parking-list');
                var parkingItem = parkingList.children[parkingItemIndex];
                if (parkingItem) {
                    parkingItem.remove();
                }
            } else {
                console.error(`Eroare la ștergerea parcarii cu id-ul ${parkingId}.`);
            }
            parkingDeleteModal.style.display = 'none'; 
        })
        .catch(error => console.error('Error:', error));
    }
}
});

function getCookie(name) {  
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

