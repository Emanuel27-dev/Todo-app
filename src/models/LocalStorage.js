export class LocalStorageTask {

	saveTask(task) {
		// console.log(task);
		localStorage.setItem(task.code,JSON.stringify(task));
	}

	deleteTask(idTask) {
		localStorage.removeItem(idTask);
	}

	updateTask(idTask) {
		
		const obj = JSON.parse(localStorage.getItem(idTask));
		obj.check = !obj.check;//modificando el valor de check
		localStorage.setItem(idTask,JSON.stringify(obj));

	}

	arrayLocalStorageTasks() {

		const arrayValuesString = [];

		for(let key of Object.keys(localStorage)){
			if(key.length > 30){
				// hago un push del valor
				arrayValuesString.push(localStorage[key]);
			}
		}

		const arrayObjs = arrayValuesString.map((objString) => {
			return JSON.parse(objString);
		});

		return arrayObjs;
	}


	saveCounterCode(counterCode) {
		localStorage.setItem('counter',counterCode.toString());
	}

	saveObjCodes(objCodes) {
		localStorage.setItem('objCodes', JSON.stringify(objCodes));
	}

	deleteObjCode(idTask) {
		const objCodes = JSON.parse(localStorage.getItem('objCodes'));

		for(let key of Object.keys(objCodes)) {
			if(idTask === objCodes[key]) delete objCodes[key]
		}

		localStorage.setItem('objCodes',JSON.stringify(objCodes));

	}

	getObjCodes() {

		return (localStorage.getItem('objCodes') === null) ? {} 
		: JSON.parse(localStorage.getItem('objCodes'));
	}
}