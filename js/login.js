const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const contraseña = document.getElementById("password").value;

    try{
        const respuesta = await axios.post("http://localhost:3000/user/login", {
            email,
            contraseña
        });
        localStorage.setItem("token", respuesta.data);
        console.log(respuesta.data);
    }catch(error){
        console.log(error);
    }
})