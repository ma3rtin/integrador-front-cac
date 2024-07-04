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

  const registro = await axios.post(
    "https://greenland-0po3.onrender.com/user/registro",
    usuario
  );
  console.log(registro);
});
