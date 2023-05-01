import { request, response } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import { User } from '../models/userModel.js'

export const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token')

    if (!token) return res.status(401).json({ ok: false, msg: 'No existe el token en la peticion !' })

    try {
        const { uid } = jsonwebtoken.verify(token, process.env.SECRETKEY)

        const user = await User.findById(uid)

        if (!user) return res.status(400).json({ ok: false, msg: 'Usuario no encontrado !' })
        if (!user.isActive) return res.status(400).json({ ok: false, msg: 'Usuario inactivo !' })

        req.user = user // asi estara de manera global en la request

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ ok: false, msg: 'Token no valido !' })
    }
}