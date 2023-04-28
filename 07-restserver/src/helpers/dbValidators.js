import { Role } from '../models/roleModel.js'
import { User } from '../models/userModel.js'

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