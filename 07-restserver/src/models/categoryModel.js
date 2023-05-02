import { Schema, model } from 'mongoose'

const categorySchema = Schema({
    name: {
        type: String,
        required: [true, 'El name es obligatorio'],
        unique: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

categorySchema.methods.toJSON = function () {
    const { __v, isDeleted, ...category } = this.toObject()

    return category
}

export const Category = model('Category', categorySchema)