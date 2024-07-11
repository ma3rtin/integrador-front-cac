document.addEventListener("DOMContentLoaded", async() => {
    const token = localStorage.getItem("token")
    const email = localStorage.getItem("email")

    //console.log(token)
    //console.log(email)

    try{
        const respuesta = await axios.post(site + "/user/checkLogin", {
            email
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const name = respuesta.data
        //console.log(name);
        const loginLi = document.querySelector("#login");
        const registerLi = document.querySelector("#register");

        registerLi.innerHTML = `${name}`
        loginLi.innerHTML = `<a id="logOut" href="">(Salir)</a>`
    }catch(error){
        localStorage.removeItem("token")
        localStorage.removeItem("email")
    }

    const logOut = document.querySelector("#logOut");

    if (logOut){
        logOut.addEventListener("click", async (event) => {
        event.preventDefault();
        try{
            localStorage.removeItem("token")
            localStorage.removeItem("email")
            window.location.reload()
        }catch(error){
            console.log(error);
        }
    })}
})

