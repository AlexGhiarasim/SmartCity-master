document.addEventListener('DOMContentLoaded', function () {
    const actionText = document.getElementById('actionText');
    const signUpButton = document.getElementById('signUpButton');
    const loginButton = document.getElementById('loginButton');
    const container = document.querySelector('.inputs');

    const updateView = (action) => {
        actionText.textContent = action;
        container.innerHTML = ''; 
        
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
    }

    signUpButton.addEventListener('click', () => {
        if (actionText.textContent !== 'Sign Up') {
            updateView('Sign Up');
        }
    });

    loginButton.addEventListener('click', () => {
        if (actionText.textContent !== 'Login') {
            updateView('Login');
        }
    });

    updateView('Login'); 

    function createInput(type, placeholder, id) {
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('input');
        inputDiv.id = id;

        const inputImg = document.createElement('img');
        inputImg.src = `../static/img/${type === 'password' ? 'password' : 'person'}.png`;
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
    const actionText = document.getElementById('actionText');
    const signUpButton = document.getElementById('signUpButton');
    const loginButton = document.getElementById('loginButton');
    const container = document.querySelector('.inputs');

    const updateView = (action) => {
        actionText.textContent = action;
        if (action === 'Login') {
            signUpButton.classList.add('gray');
            loginButton.classList.remove('gray');
            const confirmPasswordInput = document.getElementById('confirmPasswordInput');
            if (confirmPasswordInput) {
                confirmPasswordInput.remove();
            }
        } else {
            signUpButton.classList.remove('gray');
            loginButton.classList.add('gray');
            if (!document.getElementById('confirmPasswordInput')) {
                const confirmPasswordInput = createInput('password', 'Confirm Password', 'confirmPasswordInput');
                container.appendChild(confirmPasswordInput);
            }
        }
    }

    signUpButton.addEventListener('click', () => {
        if (actionText.textContent !== 'Sign Up') {
            updateView('Sign Up');
        }
    });

    loginButton.addEventListener('click', () => {
        if (actionText.textContent !== 'Login') {
            updateView('Login');
        }
    });

    updateView('Login');

    function createInput(type, placeholder, id) {
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('input');
        inputDiv.id = id;

        const inputImg = document.createElement('img');
        inputImg.src = '../static/img/password.png';
        inputImg.alt = '';

        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;

        inputDiv.appendChild(inputImg);
        inputDiv.appendChild(input);

        return inputDiv;
    }
});
