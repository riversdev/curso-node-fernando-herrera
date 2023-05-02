import { Schema, model } from 'mongoose'

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'El name es obligatorio'],
        unique: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
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

productSchema.methods.toJSON = function () {
    const { __v, isDeleted, ...product } = this.toObject()

    return product
}

export const Product = model('Product', productSchema)