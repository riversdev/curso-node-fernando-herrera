import 'colors'
import readline from 'readline'
import { stdin as input, stdout as output } from 'process'

export const showMenu = () => new Promise((resolve) => {
    console.clear()
    console.log('========================='.green)
    console.log('     Elija una opcion    '.green)
    console.log('=========================\n'.green)

    console.log(`${'1.'.green} Crear tarea`)
    console.log(`${'2.'.green} Listar tareas`)
    console.log(`${'3.'.green} Listar tareas completadas`)
    console.log(`${'4.'.green} Listar tareas pendientes`)
    console.log(`${'5.'.green} Completar tarea`)
    console.log(`${'6.'.green} Borrar tarea`)
    console.log(`${'0.'.green} Salir\n`)

    const rl = readline.createInterface({ input, output })

    rl.question('Elija una opcion: ', (opt) => {
        rl.close()

        resolve(opt)
    })
})

export const pause = () => new Promise((resolve) => {
    const rl = readline.createInterface({ input, output })

    rl.question(`\nPresione ${'ENTER'.green} para continuar\n`, () => {
        rl.close()

        resolve()
    })
})