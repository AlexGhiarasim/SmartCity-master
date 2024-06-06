document.addEventListener('DOMContentLoaded', function () {

    let counterSignUp = 0;
    let counterLogin = 1;

    loginButton.addEventListener("click", function (event) {
        event.preventDefault();
        counterLogin++;
        counterSignUp = 0;
        const nameInput = document.getElementById("nameInput");
        const passwordInput = document.querySelector(".input input[type='password']");
        nameInput.value = '';
        passwordInput.value = '';

        if (counterLogin > 1) {
            const action = document.getElementById("actionText").textContent;
            if (action === "Login") {
                const name = nameInput.value;
                const password = passwordInput.value;

                if (name.trim() !== "" && password.trim() !== "") {

                    const credentials = {
                        name: name,
                        password: password
                    };

                    fetch("/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        }, body: JSON.stringify(credentials)
                    }).then(response => {
                        if (response.ok) {
                            // cerere GET autentificata la pagina de home
                        } else {
                            // aici voi face o caseta pt raspuns incorect
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
    });

    signUpButton.addEventListener("click", function (event) {
        event.preventDefault();
        counterSignUp++;
        counterLogin = 0;

        const nameInput = document.getElementById("nameInput");
        const passwordInput = document.querySelector(".input input[type='password']");
        const confirmPasswordInput = document.querySelector("#confirmPasswordInput input[type='password']");
        nameInput.value = '';
        passwordInput.value = '';
        confirmPasswordInput.value = '';
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
                        name: name,
                        password: password
                    };

                    fetch("/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newUser)
                    }).then(response => {
                        if (response.ok) {
                            // cerere GET autentificata la pagina de home
                        } else {
                            throw new Error("Signup failed");
                        }
                    }).catch(error => {
                        alert(error.message);
                    });
                } else {
                    alert("Please enter both name and password");
                }
            }
        }
    });
});