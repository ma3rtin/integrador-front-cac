export const esconderLoader = () => {
	var spinnerOverlay = document.getElementById("spinnerOverlay");
	spinnerOverlay.style.display = "none";
};

export const mostrarLoader = () => {
	var spinnerOverlay = document.getElementById("spinnerOverlay");
	spinnerOverlay.style.display = "flex";
};