

// Logout function
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "daftar.html";
}
