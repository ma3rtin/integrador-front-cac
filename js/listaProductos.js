document.addEventListener("DOMContentLoaded", ()=>{
    const lista =document.querySelector("#lista")

    const fetchProductos = async ()=>{
        try{
            const resp = await axios.get("http://localhost:3000/product")
            const productos = resp.data

            lista.innerHTML=""

            productos.forEach (producto=>{
                const productoContenedor = document.createElement("div")
                const nombreProducto = document.createElement("div")
                const descripcionProducto = document.createElement("div")
                const precioProducto = document.createElement("div")

                nombreProducto.innerHTML = `<h3>${producto.nombre}</h3>`
                descripcionProducto.innerHTML = `<i>${producto.descripcion}</i>`
                precioProducto.innerHTML = `${producto.precio}`

                productoContenedor.appendChild(nombreProducto)
                productoContenedor.appendChild(descripcionProducto)
                productoContenedor.appendChild(precioProducto)

                lista.appendChild(productoContenedor)
            })
            console.log(productos)



        }
        catch(error){
            console.error("Error al obtener los Productos", error)
        } 
    }


fetchProductos()

})