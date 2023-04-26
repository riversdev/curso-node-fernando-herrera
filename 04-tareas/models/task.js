import { v4 as uuid } from 'uuid'

export class Task {
    id = ''
    description = ''
    finishDate = null

    constructor(description) {
        this.id = uuid()
        this.description = description
        this.finishDate = null
    }
}