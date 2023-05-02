import { request, response } from 'express'
import { Product } from '../models/index.js'

export const getProducts = async (req = request, res = response) => {
    const { start = 0, limit = 0 } = req.query

    try {
        const [total, products] = await Promise.all([
            Product.countDocuments({ isDeleted: false }),
            Product.find({ isDeleted: false }).skip(start).limit(limit).populate('user', 'name').populate('category', 'name')
        ])

        res.json({ ok: true, total, products })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Server error' })
    }
}

export const getProduct = async (req = request, res = response) => {
    const { id } = req.params

    try {
        const product = await Product.findById(id).populate('user', 'name').populate('category', 'name')

        res.json({ ok: true, product })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Server error' })
    }
}

export const postProduct = async (req = request, res = response) => {
    const { _id, isActive, isDeleted, user, ...body } = req.body
    const product = new Product(body)

    product.user = req.user.id

    try {
        const alreadyExists = await Product.findOne({ name: product.name, isDeleted: false })

        if (alreadyExists) return res.status(400).json({ ok: false, msg: `El producto ${product.name} ya existe !` })

        await product.save()

        res.status(201).json({ ok: true, product })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Server error' })
    }
}

export const putProduct = async (req = request, res = response) => {
    const { id } = req.params
    const { _id, isDeleted, user, ...body } = req.body

    body.user = req.user.id

    try {
        const alreadyExists = await Product.findOne({ name: body.name })

        if (alreadyExists && alreadyExists.id !== id) return res.status(400).json({ ok: false, msg: `El producto ${body.name} ya existe !` })

        const product = await Product.findByIdAndUpdate(id, body, { new: true }).populate('user', 'name').populate('category', 'name')

        res.json({ ok: true, product })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Server error' })
    }
}

export const deleteProduct = async (req = request, res = response) => {
    const { id } = req.params

    try {
        await Product.findByIdAndUpdate(id, { isDeleted: true })

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Server error' })
    }
}