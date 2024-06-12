document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname === '/home') {
        fetchDataAndReplaceUsername();
    }
});

function fetchDataAndReplaceUsername() {
    console.log("apelat");
    const token = getCookie('token');
    if (token) {
        fetch('/home2', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); 
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (data && data.username) {
                    console.log("Username: " + data.username);
                    replaceUsername(data.username);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        console.error('No JWT token found in cookies');
    }
}

function replaceUsername(username) {
    var h22Element = document.querySelector('.h22');
    if (h22Element) {
        h22Element.innerHTML = '<span>' + username + '</span>';
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}
