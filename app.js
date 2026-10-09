//1. SELECCION ELEMENTOS REUTILAZABLES
const inputTarea = document.querySelector("#input-tarea");
const btnAgregar = document.querySelector("#btn-agregar");
const listaTareas = document.querySelector("#lista-tareas")
const contadorTareas = document.querySelector("#contenedor-tareas")

//2. ESTADO DE LA APLICACION
let totalPendientes = 0;

//3. FUNCION PURA: ACTUALIZAR EL ESATDO VISUAL
const actualizarContador = () => {
    contadorTareas.textContent = `Tareas Pendientes: ${totalPendientes}`
}

//4. FUNCION CREAR Y AGREGAR UN NODO AL DOM
const agregarNuevatarea = () => {
    const textoLimpio = inputTarea.value.trim();

    //valiadacion de entrada: evitar cadenas vacias
    if (textoLimpio === "") {
        alert("Por favor, ingresa una descripcion para la tarea");
        return;
    }


    // A. Crear el contenedor <li>
    const li = document.createElement("li");
    li.classList.add("tarea-item");

    // B. Crea el texto de la tarea
    const spanTexto = document.createElement("span")
    spanTexto.textContent = textoLimpio;

    // C. Crea el boton de accion
    const btnAccion = document.createElement("button")
    btnAccion.textContent = "Completar";
    btnAccion.classList.add("btn-completar");
    const btnEliminar = document.createElement("button")
    btnEliminar.textContent = "X"
    btnEliminar.classList.add("btn-eliminar")

    // D. Asignar Event Listener al boton de la tareas recien creada
    btnAccion.addEventListener("click", () => {
        const estaCompletada = li.classList.toggle("completada");

        if (estaCompletada) {
            btnAccion.textContent = "Reabrir";
            totalPendientes -= 1;
        } else {
            btnAccion.textContent = "completar";
            totalPendientes += 1;
        }

        actualizarContador();
    });

    btnEliminar.addEventListener("click", () => {
        
    })

    // E. Esamblar los elementos hijo dentro del <li>
    li.appendChild(spanTexto)
    li.appendChild(btnAccion)
    li.appendChild(btnEliminar)

    //F. Inyectar el nodo completo al arbol del DOM
    listaTareas.appendChild(li)

    //G. Actualizar estado interno y limpiar el campo de entrada
    totalPendientes += 1;
    actualizarContador()
    inputTarea.value = "";
    inputTarea.focus()
}

// 5. REGISTRO DE EVENTOS PRINCIPALES
// Disparar acccion con click en el boton
btnAgregar.addEventListener("click", agregarNuevatarea);

// Disparar accion al presionar la tecla "Enter" dentro del input
inputTarea.addEventListener("keydown", (Event) => {
    if (Event.key === "Enter") {
        agregarNuevatarea();
    }
})