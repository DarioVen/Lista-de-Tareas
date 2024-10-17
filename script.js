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
    listaTareas.appendChild(li);
    // Crear un botón de eliminar
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add('boton-eliminar');
    botonEliminar.onclick = () => eliminarTarea(index);
    li.appendChild(botonEliminar);
  });
}

// Función para marcar una tarea como completada
function marcarCompletada(index) {
  if (index >= 0 && index < tareas.length) {
    tareas[index].completada = !tareas[index].completada;
  tareas[index].completada = !tareas[index].completada;}
  guardarTareas();
  renderizarTareas();
}

// Función para eliminar una tarea
function eliminarTarea(index) {
  if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
    tareas.splice(index, 1);
    guardarTareas();
    renderizarTareas();
  }
}

// Renderizar las tareas al cargar la página
renderizarTareas();