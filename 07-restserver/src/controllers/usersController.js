import { request, response } from 'express'
import bcryptjs from 'bcryptjs'
import { User } from '../models/userModel.js'

export const getUsers = async (req = request, res = response) => {
    const { start = 0, limit = 0 } = req.query

    try {
        // const total = await User.countDocuments({ isActive: true })
        // const users = await User.find({ isActive: true }).skip(start).limit(limit)

        const [total, users] = await Promise.all([
            User.countDocuments({ isActive: true }),
            User.find({ isActive: true }).skip(start).limit(limit)
        ])

        res.json({ ok: true, total, users })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Imposible obtener usuarios !' })
    }
}

export const getUser = async (req = request, res = response) => {
    const { id } = req.params

    try {
        const user = await User.findById(id)

        res.json({ ok: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Imposible obtener usuario !' })
    }
}

export const postUser = async (req = request, res = response) => {
    const user = new User(req.body)

    try {
        const salt = bcryptjs.genSaltSync()
        user.password = bcryptjs.hashSync(user.password, salt)

        await user.save()

        res.status(201).json({ ok: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Imposible guardar usuario !' })
    }
}

export const putUser = async (req = request, res = response) => {
    const { id } = req.params
    const { _id, ...body } = req.body

    try {
        if (body.password) {
            const salt = bcryptjs.genSaltSync()
            body.password = bcryptjs.hashSync(body.password, salt)
        }

        const user = await User.findByIdAndUpdate(id, body, { new: true })

        res.json({ ok: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Imposible actualizar usuario !' })
    }
}

export const deleteUser = async (req = request, res = response) => {
    const { id } = req.params

    try {
        await User.findByIdAndUpdate(id, { isActive: false })

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Imposible actualizar usuario !' })
    }
}