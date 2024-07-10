import { mostrarLoader, esconderLoader } from "./loader.js";

document.addEventListener("DOMContentLoaded", () => {
	esconderLoader();

	const resetButton = document.getElementById("reset-button");
	resetButton.addEventListener("click", () => {
		poneCargaProductoTitulo();
		cambiarEnviarModificarBoton();
	});

	function poneCargaProductoTitulo() {
		const formTitle = document.getElementById("formTitle");
		formTitle.textContent = "Carga producto";
	}

	function cambiarEnviarModificarBoton() {
		const submitBtn = document.getElementById("submit-btn");
		submitBtn.style.display = "inline";
		const modifyBtn = document.getElementById("modify-btn");
		modifyBtn.style.display = "none";
	}

	const form = document.querySelector("#productForm");
	// Agrega productos ------------------------------
	form.addEventListener("submit", async (event) => {
		mostrarLoader();
		event.preventDefault();
		const formData = new FormData(event.target);
		const dataObject = Object.fromEntries(formData.entries());
		let hayCamposVacios = false;
		for (const key in dataObject) {
			if (dataObject.hasOwnProperty(key)) {
				dataObject[key] = dataObject[key].trim();
				if (dataObject[key] === "") {
					hayCamposVacios = true;
				}
			}
		}
		if (hayCamposVacios) {
			alert("Todos los campos son obligatorios y no deben estar vacíos.");
			esconderLoader();
			return;
		}
		if (dataObject.stock !== undefined && parseInt(dataObject.stock) <= 0) {
			alert("El valor del stock debe ser mayor a 0.");
			// Si tienes una función para esconder un loader, llámala aquí
			esconderLoader();
			return;
		}
		try {
			await axios.post(site + "/product/", dataObject);
			form.reset();
			traerProductos();
		} catch (error) {
			console.error("Error al postear", error);
			esconderLoader();
			alert(error);
		} finally {
			esconderLoader();
		}
	});

	// Trae productos a la vista --------------------
	async function traerProductos() {
		mostrarLoader();
		try {
			const response = await axios.get(`${site}/product/`);
			const data = response.data;
			const plantsContainer = document.querySelector("#table-content");

			let productos = "";
			data.forEach((item) => {
				productos += `
            		<li class="plant">
                    	<span class="">${item.nombre}</span>
                    	<span class="">${item.stock}</span>
						<span class="">$${item.precio}</span>
						<span class="category-field">${item.categoria}</span>
						<span class="description-field">${item.descripcion}</span>
						<div class="buttons-container">
							<button class="modify-button" id="${item.id}">Modificar</button>
							<button class="delete-button" data-id="${item.id}">Eliminar</button>
						</div>
            		</li>`;
			});

			plantsContainer.innerHTML = productos;
			addDeleteEventListeners();
			addModifyEventListeners();
			esconderLoader();
		} catch (error) {
			console.error(error);
			// esconderLoader();
		} finally {
			// esconderLoader();
		}
	}

	traerProductos();

	// Elimina producto
	function addDeleteEventListeners() {
		const deleteButtons = document.querySelectorAll(".delete-button");
		deleteButtons.forEach((button) => {
			button.addEventListener("click", manejaClickDeBorrado);
		});
	}

	function manejaClickDeBorrado(event) {
		const productId = event.target.getAttribute("data-id");
		mostrarModalDeConfirmacion(productId);
	}

	function mostrarModalDeConfirmacion(productId) {
		const modal = document.getElementById("confirmationModal");
		const confirmButton = document.getElementById("confirmDelete");
		const cancelButton = document.getElementById("cancelDelete");
		const closeButton = document.querySelector(".close-button");
		modal.style.display = "block";

		const cerrarModal = () => {
			modal.style.display = "none";
			confirmButton.removeEventListener("click", confirmarBorrado);
			cancelButton.removeEventListener("click", cerrarModal);
			closeButton.removeEventListener("click", cerrarModal);
		};

		const confirmarBorrado = async () => {
			mostrarLoader();
			try {
				await axios.delete(`${site}/product/${productId}`);
				// document.getElementById(`product-${productId}`).remove();
				cerrarModal();
				traerProductos();
			} catch (error) {
				console.error("Error al eliminar el producto:", error);
				cerrarModal();
			} finally {
				esconderLoader();
			}
		};

		confirmButton.addEventListener("click", confirmarBorrado);
		cancelButton.addEventListener("click", cerrarModal);
		closeButton.addEventListener("click", cerrarModal);

		window.addEventListener("click", (event) => {
			if (event.target == modal) {
				cerrarModal();
			}
		});
	}

	traerProductos();

	// Modificar producto
	function addModifyEventListeners() {
		const ModifyButtons = document.querySelectorAll(".modify-button");
		ModifyButtons.forEach((button) => {
			button.addEventListener("click", obtenerIdProducto);
		});
	}

	function obtenerIdProducto(event) {
		const productId = event.target.getAttribute("id");
		obtenerProducto(productId);
	}

	function muestraValoresEnFormulario(data) {
		document.getElementById("nombre").value = data.nombre;
		document.getElementById("descripcion").value = data.descripcion;
		document.getElementById("categoria").value = data.categoria;
		document.getElementById("precio").value = data.precio;
		document.getElementById("stock").value = data.stock;
	}

	async function obtenerProducto(id) {
		mostrarLoader();
		try {
			const response = await axios.get(`${site}/product/${id}`);
			const data = response.data;
			// form.id = "modifyProductForm";
			form.setAttribute("data-id", id);
			muestraValoresEnFormulario(data);
			const formTitle = document.getElementById("formTitle");
			formTitle.textContent = "Modificar producto";
			const submitBtn = document.getElementById("submit-btn");
			submitBtn.style.display = "none";
			const modifyBtn = document.getElementById("modify-btn");
			modifyBtn.style.display = "inline";
		} catch (error) {
			console.error(error);
		} finally {
			esconderLoader();
		}
	}

	const modifyBtn = document.getElementById("modify-btn");

	modifyBtn.addEventListener("click", async () => {
		mostrarLoader();
		const modifyForm = document.getElementById("productForm");
		const productId = modifyForm.getAttribute("data-id");
		const formData = new FormData(modifyForm);
		const dataObject = Object.fromEntries(formData.entries());
		let hayCamposVacios = false;
		for (const key in dataObject) {
			if (dataObject.hasOwnProperty(key)) {
				dataObject[key] = dataObject[key].trim();
				if (dataObject[key] === "") {
					hayCamposVacios = true;
				}
			}
		}
		if (hayCamposVacios) {
			alert("Todos los campos son obligatorios y no deben estar vacíos.");
			esconderLoader();
			return;
		}
		if (dataObject.stock !== undefined && parseInt(dataObject.stock) <= 0) {
			alert("El valor del stock debe ser mayor a 0.");
			esconderLoader();
			return;
		}
		try {
			await axios.put(`${site}/product/${productId}`, dataObject);
			form.reset();
			traerProductos();
			alert("El producto se modificó con éxito");
		} catch (error) {
			console.error("Error al postear", error);
			esconderLoader();
			alert(error);
		} finally {
			modifyForm.removeAttribute("data-id");
			poneCargaProductoTitulo();
			cambiarEnviarModificarBoton();
			esconderLoader();
		}
	});
});
