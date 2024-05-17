document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = document.querySelector("#login-form #user").value;
    const password = document.querySelector("#login-form #password").value;
    try {
        const res = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user, password })
        });

        if (!res.ok) throw new Error('Respuesta de red no fue ok.');

        const resJson = await res.json();
        if (resJson.redirect) {
            window.location.href = resJson.redirect;
        }
    } catch (error) {
        console.log("Error:", error.message);
    }
});