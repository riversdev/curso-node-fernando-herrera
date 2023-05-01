import { Schema, model } from 'mongoose'

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio :v']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio :v'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio :v']
    },
    role: {
        type: String,
        required: [true, 'El role es obligatorio :v'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    img: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    byGoogle: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.toJSON = function () {
    const { password, __v, _id, ...user } = this.toObject()

    return { ...user, uid: _id }
}

export const User = model('User', userSchema)