import { request, response } from 'express'
import bcryptjs from 'bcryptjs'
import { User } from '../models/userModel.js'
import { generateJWT } from '../helpers/generateJWT.js'
import { verifyGoogleId } from '../helpers/verifyGoogleId.js'

export const login = async (req = request, res = response) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) return res.status(400).json({ ok: false, msg: 'Usuario no encontrado !' })
        if (!user.isActive) return res.status(400).json({ ok: false, msg: 'Usuario inactivo !' })

        const isValidPassword = bcryptjs.compareSync(password, user.password)

        if (!isValidPassword) return res.status(400).json({ ok: false, msg: 'Password incorrecto !' })

        const token = await generateJWT(user.id)

        res.json({ ok: true, user, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error en el servidor' })
    }
}

export const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body

    try {
        const { name, email, picture } = await verifyGoogleId(id_token)

        let user = await User.findOne({ email })

        if (!user) {
            user = new User({ name, email, password: 'hi', role: 'USER_ROLE', img: picture, byGoogle: true })

            await user.save()
        }

        if (!user.isActive) return res.status(400).json({ ok: false, msg: 'Usuario inactivo !' })

        const token = await generateJWT(user.id)

        res.json({ ok: true, user, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Token invalido !' })
    }
}