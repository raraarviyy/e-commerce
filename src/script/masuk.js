document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah submit form default

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email === '' || password === '') {
        alert("Email dan Kata Sandi tidak boleh kosong!");
        return;
    }

    // Jika semua terisi, langsung masuk ke home
    window.location.href = "home.html";
});

