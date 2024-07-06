const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const usuario = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    email: document.getElementById("email").value,
    contraseña: document.getElementById("contraseña").value,
    genero: document.getElementById("genero").value,
  };
  try {
    const registro = await axios.post(
      "http://localhost:3000/user/registro",
      usuario
    );
    console.log(registro.data);
    alert("Usuario registrado");
    localStorage.setItem("token", registro.data);
    window.location.href = "../pages/login.html";
  } catch (error) {
    console.log(error);
  }
});
