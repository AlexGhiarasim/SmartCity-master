document.addEventListener('DOMContentLoaded', function () {
    const actionText = document.getElementById('actionText');
    const signUpButton = document.getElementById('signUpButton');
    const loginButton = document.getElementById('loginButton');
    const container = document.querySelector('.inputs');

    const updateView = (action) => {
        actionText.textContent = action;
        container.innerHTML = ''; // Clear previous inputs

        const usernameInput = createInput('text', 'Username', 'usernameInput');
        container.appendChild(usernameInput);

        if (action === 'Login') {
            signUpButton.classList.add('gray');
            loginButton.classList.remove('gray');

            const passwordInput = createInput('password', 'Password', 'passwordInput');
            container.appendChild(passwordInput);
        } else {
            signUpButton.classList.remove('gray');
            loginButton.classList.add('gray');

            const firstNameInput = createInput('text', 'First Name', 'firstNameInput');
            const lastNameInput = createInput('text', 'Last Name', 'lastNameInput');
            const passwordInput = createInput('password', 'Password', 'passwordInput');
            const confirmPasswordInput = createInput('password', 'Confirm Password', 'confirmPasswordInput');

            container.appendChild(firstNameInput);
            container.appendChild(lastNameInput);
            container.appendChild(passwordInput);
            container.appendChild(confirmPasswordInput);
        }
    };

    const clearInputs = () => {
        const inputs = container.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
    };

    signUpButton.addEventListener('click', () => {
        if (actionText.textContent !== 'Sign Up') {
            updateView('Sign Up');
            clearInputs();
        }
    });

    loginButton.addEventListener('click', () => {
        if (actionText.textContent !== 'Login') {
            updateView('Login');
            clearInputs();
        }
    });

    updateView('Login'); 

    function createInput(type, placeholder, id) {
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('input');
        inputDiv.id = id;

        const inputImg = document.createElement('img');
        inputImg.src = `./img/${type === 'password' ? 'password' : 'person'}.png`;
        inputImg.alt = '';

        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;

        inputDiv.appendChild(inputImg);
        inputDiv.appendChild(input);

        return inputDiv;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let counterSignUp = 0;
    let counterLogin = 1;

    document.getElementById('loginButton').addEventListener('click', function (event) {
        event.preventDefault();
        counterLogin++;
        counterSignUp = 0;
        const nameInput = document.getElementById('usernameInput').querySelector('input');
        const passwordInput = document.getElementById('passwordInput').querySelector('input');

        if (counterLogin > 1) {
            const action = document.getElementById('actionText').textContent;
            if (action === 'Login') {
                const name = nameInput.value;
                const password = passwordInput.value;

                if (name.trim() !== '' && password.trim() !== '') {
                    const credentials = {
                        username: name,
                        password: password
                    };

                    fetch('/api/v1/auth/signin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(credentials)
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.token) {
                            document.cookie = `token=${data.token}; path=/;`;
                            window.location.href = '/home';
                        } else {
                            throw new Error('Invalid login response');
                        }
                    })
                    .catch(error => {
                        alert(error.message);
                    });
                } else {
                    alert('Please enter both name and password');
                }
            }
        }
    });

    document.getElementById('signUpButton').addEventListener('click', function (event) {
        event.preventDefault();
        counterSignUp++;
        counterLogin = 0;

        const nameInput = document.getElementById('usernameInput').querySelector('input');
        const firstNameInput = document.getElementById('firstNameInput').querySelector('input');
        const lastNameInput = document.getElementById('lastNameInput').querySelector('input');
        const passwordInput = document.getElementById('passwordInput').querySelector('input');
        const confirmPasswordInput = document.getElementById('confirmPasswordInput')?.querySelector('input');

        if (counterSignUp > 1) {
            const action = document.getElementById('actionText').textContent;
            if (action === 'Sign Up') {
                const name = nameInput.value;
                const firstName = firstNameInput.value;
                const lastName = lastNameInput.value;
                const password = passwordInput.value;
                const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

                if (name.trim() !== '' && firstName.trim() !== '' && lastName.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '') {
                    if (password !== confirmPassword) {
                        alert('Passwords do not match');
                        return;
                    }

                    const newUser = {
                        username: name,
                        firstName: firstName,
                        lastName: lastName,
                        password: password
                    };

                    fetch('/api/v1/auth/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newUser)
                    }).then(response => {
                        if (response.ok) {
                            alert('Înregistrare cu succes! Continuați prin a vă loga în cont.');
                        } else {
                            throw new Error('Signup failed');
                        }
                    }).catch(error => {
                        alert(error.message);
                    });
                    
                } else {
                    alert('Please fill in all fields');
                }
            }
        }
    });
});
