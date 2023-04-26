import inquirer from 'inquirer'
import 'colors'

export const inquirerMenu = async () => {
    console.clear()
    console.log('========================='.green)
    console.log('     Elija una opcion    '.green)
    console.log('=========================\n'.green)

    const questions = [
        {
            type: 'list',
            name: 'option',
            message: 'Que desea hacer ?',
            choices: [
                {
                    value: 1,
                    name: `${'1.'.green} Crear tarea`
                }, {
                    value: 2,
                    name: `${'2.'.green} Listar tareas`
                }, {
                    value: 3,
                    name: `${'3.'.green} Listar tareas completadas`
                }, {
                    value: 4,
                    name: `${'4.'.green} Listar tareas pendientes`
                }, {
                    value: 5,
                    name: `${'5.'.green} Completar tarea`
                }, {
                    value: 6,
                    name: `${'6.'.green} Eliminar tarea`
                }, {
                    value: 0,
                    name: `${'0.'.green} Salir`
                }
            ]
        }
    ]

    const { option } = await inquirer.prompt(questions)

    return option
}

export const pauseInquirer = async () => {
    const question = {
        type: 'input',
        name: 'continue',
        message: `\nPresione ${'ENTER'.green} para continuar`
    }

    await inquirer.prompt(question)
}

export const readInput = async (message) => {
    const question = {
        type: 'input',
        name: 'input',
        message,
        validate: (value) => value.length !== 0
    }

    const { input } = await inquirer.prompt(question)

    return input
}

export const inquireDeleteMenu = async (tasks = []) => {
    const choices = tasks.map(({ description }, i) => ({ value: i + 1, name: `${String(i + 1 + '.').green} ${description}` }))

    choices.unshift({ value: 0, name: `${'0.'.green} Cancelar` })

    const questions = [
        {
            type: 'list',
            name: 'option',
            message: 'Cual quiere eliminar ?',
            choices
        }
    ]

    const { option } = await inquirer.prompt(questions)

    return tasks[Number(option) - 1]?.id
}

export const inquireConfirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'confirm',
            message
        }
    ]

    const { confirm } = await inquirer.prompt(question)

    return confirm
}

export const inquireCheckMenu = async (tasks = []) => {
    const choices = tasks.map(({ description, finishDate }, i) => ({ value: i + 1, name: `${String(i + 1 + '.').green} ${description}`, checked: !!finishDate }))

    const questions = [
        {
            type: 'checkbox',
            name: 'options',
            message: 'Cuales quiere completar ?',
            choices
        }
    ]

    const { options } = await inquirer.prompt(questions)

    return options.map(x => tasks[Number(x) - 1]?.id)
}