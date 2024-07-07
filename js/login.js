const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const contraseña = document.getElementById("password").value;

    try{
        const respuesta = await axios.post(site + "/user/login", {
            email,
            contraseña
        });
        localStorage.setItem("token", respuesta.data);
        console.log(respuesta.data);
        alert("Logeo Exitoso!")
        window.location.href = "../index.html";
    }catch(error){
        alert("Correo Electrónico o Contraseña incorrectos!")
        console.log(error);
    }
})