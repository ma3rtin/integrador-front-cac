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


