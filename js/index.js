
document.addEventListener("DOMContentLoaded", () => {
  async function traerProductos() {
  try {
    const response = await axios.get(
			"https://greenland-0po3.onrender.com/product"
		);
		const data = response.data;
    console.log(data);
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
                        <button class="buy">Agregar a carrito</button>
                        <select class="quantitySelect">
                          ${options}
                        </select>
                    </div>
                </div>
            </div>
        `;
		});

		plantsContainer.innerHTML = productos;
	} catch (error) {
		console.error(error);
	}
}

traerProductos();
});


// Se utiliza para modificar el ícono del corazón al darle click
const icons = document.querySelectorAll("i.fa-regular");
icons.forEach((icon) => {
  icon.addEventListener("click", () => {
  if(icon.classList.contains("fa-regular")) {
    icon.classList.replace("fa-regular", "fa-solid");
    icon.classList.add("fa-xl");
  } else {
    icon.classList.replace("fa-solid", "fa-regular");
    icon.classList.remove("fa-xl");
  }
  });     
});