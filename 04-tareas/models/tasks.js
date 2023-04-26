import 'colors'
import { Task } from './task.js'

export class Tasks {
    list = []

    constructor(list = []) {
        this.list = list
    }

    showTasks = ({ completed } = {}) => this.list
        .filter(x => completed === undefined || !!x.finishDate === completed)
        .forEach(({ description, finishDate }, i) => {
            const item = String(i + 1).green
            const status = finishDate ? `${'Completada'.green} ${finishDate.grey}` : 'Pendiente'.red

            console.log(`${item}. ${description} :: ${status}`)
        })

    addTask = (description = '') => {
        const task = new Task(description)

        this.list.push(task)
    }

    deleteTask = (taskId = '') => {
        this.list = this.list.filter(x => x.id !== taskId)

        console.log('Tarea eliminada !')
    }

    completeTask = (taskId = '', complete = true) => this.list = this.list
        .map(x => x.id !== taskId ? x : ({
            ...x,
            finishDate: !complete ? null : (!!x.finishDate ? x.finishDate : new Date().toISOString())
        }))
}