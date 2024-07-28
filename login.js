document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin' && password === 'password123') {
            sessionStorage.setItem('loggedIn', 'true');
            window.location.href = 'index.html';
        } else {
            alert('Credenziali non valide!');
        }
    });
});
