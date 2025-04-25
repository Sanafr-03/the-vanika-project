document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const phone = document.getElementById('phone').value.replace(/\D/g, '');
    const password = document.getElementById('password').value;
    
    if (phone === "6789123450" && password === "VANIKA") {
        window.location.href = "seller.html";
    } else {
        alert("Invalid phone number or password. Please try again.");
    }
});