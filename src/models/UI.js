import { LocalStorageTask } from "./LocalStorage.js";

export class UI {

	constructor () {
		// guardara todas las tareas que ire creando
		this.localStorageTask = new LocalStorageTask();
		this.counterCode = (localStorage.getItem('counter') === null) ? 0 :
		 parseInt(localStorage.getItem('counter'));

		// este objeto guardara el codigo de cada componente con su respectivo numero de orden (counter)
		this.objCodes = (localStorage.getItem('objCodes') === null) ? {} :
		JSON.parse(localStorage.getItem('objCodes'));
	}

	addTask(task) {

		const { taskName, getDate, code, check } = task;

		if(document.querySelector('.container-tasks').children.length === 0) {
			// cada que no haya componentes, setear el contador
			this.counterCode = 0;
		}

		if(taskName.length === 0) return;

		const containerTasks = document.querySelector('.container-tasks');
		const taskElementHTML = `
			<article class='article'>
				<div>
					<span class='container-check'>
						<i class="fa-regular fa-circle-check" id=${code}></i>
					</span>
					<span class='article__taskName'>${taskName}</span>
				</div>
				<div>
					<span class='span-hour'>${getDate()}</span>
					<span>
						<i class="trash-icon fa-regular fa-trash-can"></i>
					</span>
				</div>
			</article>
		`;

		containerTasks.innerHTML += taskElementHTML;
		this.cleanInput();

		// actualizar el contador y guardar los codigos ordenados
		this.counterCode += 1;
		this.localStorageTask.saveCounterCode(this.counterCode);

		// esta condicion es necesaria para actualizar el objeto, de lo contrario seguira almacenando informacion que nosotros querremos borrar.
		if(localStorage.getItem('objCodes')){
			this.objCodes = JSON.parse(localStorage.getItem('objCodes'));
		}

		this.objCodes[this.counterCode] = code;
		this.localStorageTask.saveObjCodes(this.objCodes);		

		// guardando la informacion de una tarea
		this.localStorageTask.saveTask({
			check,
			taskName,
			code,
			date: getDate()
		});

	}

	toggleCheckTask(taskElementHTML) {

		// obteniendo ese span para modificar el texto y tacharlo
		const spanTaskName = taskElementHTML.parentElement.nextElementSibling;

		if(taskElementHTML.classList.contains('fa-solid')){
			taskElementHTML.classList.replace('fa-solid','fa-regular');
			spanTaskName.style.textDecorationLine = 'initial';
		}

		else if(taskElementHTML.classList.contains('fa-regular')) {
			taskElementHTML.classList.replace('fa-regular','fa-solid');
			spanTaskName.style.textDecorationLine = 'line-through';
			spanTaskName.style.textDecorationThickness =  '.5px';
		}
	}

	changeStateCheck (taskElementHTML) {
		const idTask = taskElementHTML.getAttribute('id');
		this.localStorageTask.updateTask(idTask); // cambiando check boolean
	} 

	cleanInput() {
		// seteando el valor
		document.querySelector("[name=taskInput]").value = '';
	}

	deleteTask(taskElementHTML) {

		// accediendo al svg check
		const idTask = taskElementHTML.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.getAttribute('id');
		this.localStorageTask.deleteTask(idTask); // eliminando elemento del localStorage

		// eliminando la posicion del codigo
		this.localStorageTask.deleteObjCode(idTask);

		// eliminando el elemento 'componente'
		taskElementHTML.parentElement.parentElement.parentElement.remove();
	}

	renderTasks() {

		const containerTasks = document.querySelector('.container-tasks');
		const arrayTasks = this.localStorageTask.arrayLocalStorageTasks();
		const objSortCodes = this.localStorageTask.getObjCodes();
		/*

		objSortCodes = {
			1:'dsds54er33r3ew',
			2:'568eddwrr45ere',
			3:'7tr7t4354734h3'
		}

		*/
		const objSortTasks = {}; // aca iran los objetos con su nro de orden

		if(Object.keys(objSortCodes) === 0) return; // si no hay elementos para renderizar salimos

		// Asociando la posicion a los elementos, para que luego se renderizen en orden
		/*
			ejemplo simple:
			const codes = [{code:'184'},{code:'742'},{code:'193'}];
			// 3 1 2
			const obj = {
			  1: '742',
			  2: '193',
			  3: '184'
			}

			const newObj = {}
				
			for(key of Object.keys(obj)){
			  codes.forEach(element => {
			    if(obj[key] === element.code){
			      newObj[key] = element;
			    }
			  });
			}
		
		*/
		for(let key of Object.keys(objSortCodes)) {
			arrayTasks.forEach(task => {
				if(objSortCodes[key] === task.code){
					objSortTasks[key] = task;
				}
			});
		}

		const newArrayTasks = Object.values(objSortTasks);

		newArrayTasks.forEach(({taskName,date, code , check}) => {
			const taskElementHTML = `
				<article class='article'>
					<div>
						<span class='container-check'>
							<i class="${(check)?'fa-solid':'fa-regular'} fa-circle-check" id=${code}></i>
						</span>
						<span class=${(check)?'marcado':'no-marcado'}>${taskName}</span>
					</div>
					<div>
						<span>${date}</span>
						<span>
							<i class="trash-icon fa-regular fa-trash-can"></i>
						</span>
					</div>
				</article>
			`;

			containerTasks.innerHTML += taskElementHTML;
		});


	}
}