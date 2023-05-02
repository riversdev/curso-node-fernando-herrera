import { request, response } from 'express'
import { Category } from '../models/index.js'

export const getCategories = async (req = request, res = response) => {
    const { start = 0, limit = 0 } = req.query

    try {
        const [total, categories] = await Promise.all([
            Category.countDocuments({ isDeleted: false }),
            Category.find({ isDeleted: false }).skip(start).limit(limit).populate('user', 'name')
        ])

        res.json({ ok: true, total, categories })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error en el servidor' })
    }
}

export const getCategory = async (req = request, res = response) => {
    const { id } = req.params

    try {
        const category = await Category.findById(id).populate('user', 'name')

        res.json({ ok: true, category })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error en el servidor' })
    }
}

export const postCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase()

    try {
        const alreadyExists = await Category.findOne({ name })

        if (alreadyExists) return res.status(400).json({ ok: false, msg: `La categoria ${name} ya existe !` })

        const category = new Category({ name, user: req.user.id })

        await category.save()

        res.status(201).json({ ok: true, category })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error del servidor' })
    }
}

export const putCategory = async (req = request, res = response) => {
    const { id } = req.params
    const { _id, isDeleted, user, ...body } = req.body

    body.name = body.name.toUpperCase()
    body.user = req.user.id

    try {
        const alreadyExists = await Category.findOne({ name: body.name })

        if (alreadyExists && alreadyExists.id !== id) return res.status(400).json({ ok: false, msg: `La categoria ${body.name} ya existe !` })

        const category = await Category.findByIdAndUpdate(id, body, { new: true })

        res.json({ ok: true, category })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error en el servidor' })
    }
}

export const deleteCategory = async (req = request, res = response) => {
    const { id } = req.params

    try {
        await Category.findByIdAndUpdate(id, { isDeleted: true })

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error en el servidor' })
    }
}