import { Task } from "./src/models/Task.js";
import { UI } from "./src/models/UI.js";

const ui = new UI();
let counterComponents = 1;
// En cada recarga o inicio de la pagina, mostramos las tareas que previamente fueron almacenadas.
window.addEventListener('load',() => {
	ui.renderTasks();
});


// Escuchador del formulario
document.querySelector('form')
	.addEventListener('submit',(event) => {
		event.preventDefault();
		// formData, obtengo informacion de todos los campos
		const formData = new FormData(event.target);
		const valueInput = formData.get('taskInput');

		const task = new Task(valueInput);
		ui.addTask(task);

	});



// Escuchador del contenedor de los tasks, para eliminarlos
document.querySelector('.container-tasks')
	.addEventListener('click', (event) => {
		// capturando exactamente el svg para eliminar todo el task
		if(event.target.classList.contains('trash-icon')) {
			ui.deleteTask(event.target);
		}

		if(event.target.classList.contains('fa-circle-check')){
			//cambiando el icono
			ui.toggleCheckTask(event.target);
			ui.changeStateCheck(event.target);
		}

	});


