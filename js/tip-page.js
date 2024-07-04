// Función para obtener parámetros de la URL
function getQueryParams() {
  const params = {};
  window.location.search
    .substring(1)
    .split("&")
    .forEach((pair) => {
      const [key, value] = pair.split("=");
      params[key] = decodeURIComponent(value);
    });
  return params;
}

// Obtener el parámetro "img" de la URL
const params = getQueryParams();
const imgParam = params.img;

// Referencia al elemento de la imagen
const imgElement = document.getElementById("tip-img");
const tipTitle = document.getElementById("tip-title");
const tipTexT = document.getElementById("tip-text");


// Cargar la imagen correspondiente según el parámetro
if (imgParam === "transplant") {
  imgElement.src = "../assets/images/transplant.jpg";
  tipTitle.innerText = `5 pasos para transplantar de manera fácil y rápida`;
  let newTipText = `<p>  
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, esse numquam amet temporibus ab saepe officia quos? Quos, rem eos culpa asperiores, odio repellat atque consequatur rerum earum laudantium inventore dolorem nemo ipsum quasi! Quod sapiente hic esse deserunt delectus totam ipsam. Nihil est optio praesentium molestiae maiores.
                </p>
                <ul>
                  <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, ea</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam velit</li>
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                  <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
                </ul>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet iste consequatur animi praesentium quos, aliquid excepturi hic sit neque, consectetur quam porro aperiam commodi molestias odit provident. Vero corrupti nam consectetur odio porro praesentium consequuntur voluptatum eligendi voluptatibus aperiam laboriosam quasi fugiat, eos ullam ab doloribus eveniet ex voluptas? Cupiditate?
                </p>
                <a class="goToIndexBtn" href="../index.html">volver al inicio</a>`;    
  tipTexT.innerHTML = newTipText;
} else if (imgParam === "plant-care") {
  imgElement.src = "../assets/images/plant-care.jpg";
  tipTitle.innerText = `Cuidados generales de plantas`;
} else {
  imgElement.alt = "Imagen no encontrada";
}

