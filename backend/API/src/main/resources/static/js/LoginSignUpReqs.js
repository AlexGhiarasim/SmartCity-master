document.addEventListener('DOMContentLoaded', function () {

    let counterSignUp = 0;
    let counterLogin = 1;

    loginButton.addEventListener("click", function (event) {
        event.preventDefault();
        counterLogin++;
        counterSignUp = 0;
        const nameInput = document.getElementById("nameInput");
        const passwordInput = document.querySelector(".input input[type='password']");


        if (counterLogin > 1) {
            const action = document.getElementById("actionText").textContent;
            if (action === "Login") {
                const name = nameInput.value;
                const password = passwordInput.value;

                if (name.trim() !== "" && password.trim() !== "") {

                    const credentials = {
                        username: name,
                        password: password
                    };
                    fetch("/api/v1/auth/signin", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        }, body: JSON.stringify(credentials)
                    }).then(response => response.json())
                        .then(data => {
                            if (data.token) {
                                // Store the JWT token
                                localStorage.setItem('token', data.token);
                                // Redirect to home page
                                window.location.href = "/home.html";
                            } else {
                                throw new Error("Username or password incorrect");
                            }
                        })
                        .catch(error => {
                            alert(error.message);
                        });
                } else {
                    alert("Please enter both name and password");
                }
            }
        }
        nameInput.value = '';
        passwordInput.value = '';
    });

    signUpButton.addEventListener("click", function (event) {
        event.preventDefault();
        counterSignUp++;
        counterLogin = 0;

        const nameInput = document.getElementById("nameInput");
        const passwordInput = document.querySelector(".input input[type='password']");
        const confirmPasswordInput = document.querySelector("#confirmPasswordInput input[type='password']");
 
        if (counterSignUp > 1) {
            const action = document.getElementById("actionText").textContent;
            if (action === "Sign Up") {

                const name = nameInput.value;
                const password = passwordInput.value;
                const confirmPassword = confirmPasswordInput.value;

                nameInput.value = '';
                passwordInput.value = '';
                confirmPasswordInput.value = '';

                if (name.trim() !== "" && password.trim() !== "" && confirmPassword.trim() !== "") {
                    if (password !== confirmPassword) {
                        alert("Passwords do not match");
                        return;
                    }

                    const newUser = {
                        username: name,
                        password: password
                    };

                    fetch("/api/v1/auth/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newUser)
                    }).then(response => response.json())
                        .then(data => {
                            if (data.token) {
                                // Store the JWT token
                                localStorage.setItem('token', data.token);
                                // Redirect to home page
                                fetch('/home', {
                                    headers: {
                                        'Authorization': `Bearer ${data.token}`
                                    }
                                }).then(response => {
                                    if (response.status === 401) {
                                        window.location.href = '/index.html';
                                    }})
                            } else {
                                throw new Error("Username or password incorrect");
                            }
                        }).catch(error => {
                        alert(error.message);
                    });
                } else {
                    alert("Please enter both name and password");
                }
            }
        }
        nameInput.value = '';
        passwordInput.value = '';
        confirmPasswordInput.value = '';
    });
});