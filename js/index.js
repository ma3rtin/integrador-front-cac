import { mostrarLoader, esconderLoader } from "./loader.js";

document.addEventListener("DOMContentLoaded", () => {
  
  async function traerProductos() {
    mostrarLoader();
    try {
      const response = await axios.get(
        "http://localhost:3000/product"
      );
      const data = response.data;
      const plantsContainer = document.querySelector("#plantsContainer");

      let productos = "";
      data.forEach((item) => {
        let options = "";
        for (let i = 1; i <= item.stock; i++) {
          options += `<option value="${i}">${i}</option>`;
        }
        productos += `
            <div id="${item.id}" class="plant">
                <img src="./assets/images/plant1.jpg"" alt="${item.nombre}">
                <div class="productInfoContainer">
                    <p class="titlePlant">${item.nombre}</p>
                    <p class="price">$${item.precio}</p>
                    <div class="buyPlant">
                        <button class="buy" data-id="${item.id}"">Agregar a carrito</button>
                        <select class="quantitySelect" id="cantidadSelect-${item.id}">
                          ${options}
                        </select>
                    </div>
                </div>
            </div>
        `;
      });

      plantsContainer.innerHTML = productos;
      esconderLoader();
      crearBotones();
    } catch (error) {
      console.error(error);
      esconderLoader();
    }
  }

  traerProductos();
});

//Funcion que tiene el boton "agregar producto" en cada tarjeta
async function agregarProducto(idProducto, cantidad) {
  try {
    const response = await axios.post(
      `http://localhost:3000/carrito/${idProducto}`,
      {
        idProducto,
        cantidad,
      }
    );
    const data = response.data;
    console.log(data);
    alert("Producto agregado al carrito");
  } catch (error) {
    console.error(error);
    alert("Hubo un error al agregar el producto al carrito");
  }
};

// traigo de la DB productos de la categoria planta y las muestro
const plantasBoton = document.getElementById("plantas");
plantasBoton.addEventListener("click", async () => {
  mostrarLoader();
  try {
    const response = await axios.get(
      "http://localhost:3000/product/categoria/planta"
    );
    const data = response.data;
    console.log(data)
    const plantsContainer = document.querySelector("#plantsContainer");

    let productos = "";
    data.forEach((item) => {
      let options = "";
      for (let i = 1; i <= item.stock; i++) {
        options += `<option value="${i}">${i}</option>`;
      }
      productos += `
          <div id="${item.id}" class="plant">
              <img src="./assets/images/plant1.jpg"" alt="${item.nombre}">
              <div class="productInfoContainer">
                  <p class="titlePlant">${item.nombre}</p>
                  <p class="price">$${item.precio}</p>
                  <div class="buyPlant">
                      <button class="buy" data-id="${item.id}"">Agregar a carrito</button>
                      <select class="quantitySelect" id="cantidadSelect-${item.id}">
                        ${options}
                      </select>
                  </div>
              </div>
          </div>
      `;
    });

    plantsContainer.innerHTML = productos;
    esconderLoader();
    crearBotones();
  } catch (error) {
    console.error(error);
    esconderLoader();
  }
})

// creación de los botones con la funcion de agregarProducto
function crearBotones() {
  const botones =  document.querySelectorAll(".buy");
  console.log("botones: ", botones);
  botones.forEach((b) => {
    b.addEventListener("click", () => {
      const productoId = b.getAttribute("data-id");
      const cantidad = document.getElementById(
        `cantidadSelect-${productoId}`
      ).value;
      agregarProducto(productoId, cantidad);
    });
  });
}

// Se utiliza para modificar el ícono del corazón al darle click
const icons = document.querySelectorAll("i.fa-regular");
icons.forEach((icon) => {
  icon.addEventListener("click", () => {
    if (icon.classList.contains("fa-regular")) {
      icon.classList.replace("fa-regular", "fa-solid");
      icon.classList.add("fa-xl");
    } else {
      icon.classList.replace("fa-solid", "fa-regular");
      icon.classList.remove("fa-xl");
    }
  });
});
