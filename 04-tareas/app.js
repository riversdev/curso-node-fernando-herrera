import 'colors'
import { inquireDeleteMenu, inquirerMenu, pauseInquirer, readDB, readInput, saveDB, inquireConfirm, inquireCheckMenu } from './helpers/index.js'
import { Tasks } from './models/index.js'

(async () => {
    console.clear()

    const initialTasks = readDB()
    const tasks = new Tasks(initialTasks)

    let opt = ''

    do {
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                const description = await readInput('Descripcion: ')

                tasks.addTask(description)
                break

            case 2:
                tasks.showTasks()
                break

            case 3:
                tasks.showTasks({ completed: true })
                break

            case 4:
                tasks.showTasks({ completed: false })
                break

            case 5:
                const checkTasksId = await inquireCheckMenu(tasks.list)

                tasks.list.forEach(({ id }) => tasks.completeTask(id, checkTasksId.includes(id)))

                console.log('Tareas completadas !')
                break

            case 6:
                const deleteTaskId = await inquireDeleteMenu(tasks.list)

                if (!deleteTaskId) break

                const deleteConfirm = await inquireConfirm('Seguro de eliminar la tarea ?')

                if (deleteConfirm) tasks.deleteTask(deleteTaskId)
                break
        }

        saveDB(tasks.list)

        if (opt !== 0) await pauseInquirer()
    } while (opt !== 0)
})()