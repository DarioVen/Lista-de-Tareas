// Obtener las tareas desde localStorage
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// Obtener botón del DOM
let boton = document.getElementById("agregarTarea")
boton.onclick = () => agregarTarea();

// Función para agregar una nueva tarea
function agregarTarea() {
  const nuevaTarea = document.getElementById('nuevaTarea').value;
  tareas.push({
    texto: nuevaTarea,
    completada: false
  });
  guardarTareas();
  renderizarTareas();
  document.getElementById('nuevaTarea').value = '';
}

// Función para guardar las tareas en localStorage
function guardarTareas() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para renderizar la lista de tareas en el HTML
function renderizarTareas() {
  const listaTareas = document.getElementById('listaTareas');
  listaTareas.innerHTML = '';
  tareas.forEach((tarea, index) => {
    const li = document.createElement('li'); 

    li.textContent = tarea.texto;
    if (tarea.completada) {
      li.classList.add('completada');
    }
    li.onclick = () => marcarCompletada(index);
    // Crear un botón de eliminar
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add('boton-eliminar');
    botonEliminar.onclick = () => eliminarTarea(index);
    li.appendChild(botonEliminar);
    listaTareas.appendChild(li);
  });
}

// Función para marcar una tarea como completada
function marcarCompletada(index) {
  tareas[index].completada = !tareas[index].completada;
  guardarTareas();
  renderizarTareas();
}

// Función para eliminar una tarea
function eliminarTarea(index) {
  tareas.splice(index, 1); // Elimina el elemento en el índice especificado
  guardarTareas();
  renderizarTareas(); // Vuelve a renderizar la lista para reflejar los cambios
}

// Renderizar las tareas al cargar la página
renderizarTareas();