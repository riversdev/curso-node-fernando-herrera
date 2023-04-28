import { Schema, model } from 'mongoose'

const roleSchema = Schema({
    role: {
        type: String,
        required: [true, 'El role es obligatorio']
    }
})

export const Role = model('Role', roleSchema)