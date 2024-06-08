document.addEventListener('DOMContentLoaded', function () {
    const usernameHeader = document.querySelector('.h2');

    usernameHeader.textContent = `${"Trebuie"} ${"acum"}`;
    // fetch('/api/v1/user/info')
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Raspuns invalid!');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         const { firstName, lastName } = data;
    //         usernameHeader.textContent = `${firstName} ${lastName}`;
    //     })
    //     .catch(error => {
    //         console.error('There was a problem with the fetch operation:', error);
    //     });
});
