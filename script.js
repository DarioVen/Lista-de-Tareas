// Obtener las tareas desde localStorage
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

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
  });
}

// Función para marcar una tarea como completada
function marcarCompletada(index) {
  tareas[index].completada = !tareas[index].completada;
  guardarTareas();
  renderizarTareas();
}

// Renderizar las tareas al cargar la página
renderizarTareas();