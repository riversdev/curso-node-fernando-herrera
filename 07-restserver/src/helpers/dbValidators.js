import { Role, User, Category, Product } from '../models/index.js'

export const roleExists = async (role = '') => {
    const alreadyExists = await Role.findOne({ role })

    if (!alreadyExists) throw new Error(`El role ${role} no existe !`)
}

export const emailExists = async (email = '') => {
    const alreadyExists = await User.findOne({ email })

    if (alreadyExists) throw new Error(`El email ${email} ya existe !`)
}

export const userExistsById = async (id = '') => {
    const alreadyExists = await User.findById(id)

    if (!alreadyExists) throw new Error(`El usuario con el id ${id} no existe !`)
}

export const categoryExistsById = async (id = '') => {
    const alreadyExists = await Category.findById(id)

    if (!alreadyExists || alreadyExists.isDeleted) throw new Error(`La categoria con el id ${id} no existe !`)
}

export const productExistsById = async (id = '') => {
    const alreadyExists = await Product.findById(id)

    if (!alreadyExists || alreadyExists.isDeleted) throw new Error(`El producto con el id ${id} no existe !`)
}

export const checkCollections = (collection = '', validCollections = []) => {
    if (!validCollections.includes(collection)) throw new Error(`La collection no es una de ${validCollections} !`)

    return true
}