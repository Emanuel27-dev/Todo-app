import { v4 as uuidv4 } from 'uuid';

export class Task {
	constructor(taskName){
		this.taskName = taskName;
		this.check = false;
		this.code = uuidv4();
	}

	getDate() {
		const date = new Date();
		const minutes = (date.getMinutes() <= 9) ? `0${date.getMinutes()}`: date.getMinutes();
		return ((date.getHours() >= 0 && date.getHours() <= 11)
				?
				`${date.getHours()}:${minutes} AM`
				:
				`${date.getHours()}:${minutes} PM`);

	}
}