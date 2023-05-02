import { request, response } from 'express'
import { isValidObjectId } from 'mongoose'
import { Category, Product, User } from '../models/index.js'

const validCollections = ['users', 'categories', 'products', 'roles']

const searchUsers = async (term = '', res = response) => {
    try {
        const isMongoId = isValidObjectId(term)

        if (isMongoId) {
            const user = await User.findById(term)

            return res.json({ ok: true, results: !!user ? [user] : [] })
        }

        const regex = new RegExp(term, 'i')

        const users = await User.find({
            $or: [{ name: regex }, { email: regex }, { role: regex }],
            $and: [{ isActive: true }]
        })

        res.json({ ok: true, total: users.length, results: users })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Server error' })
    }
}

const searchCategories = async (term = '', res = response) => {
    try {
        const isMongoId = isValidObjectId(term)

        if (isMongoId) {
            const category = await Category.findById(term)

            return res.json({ ok: true, results: !!category ? [category] : [] })
        }

        const regex = new RegExp(term, 'i')

        const categories = await Category.find({ name: regex, isDeleted: false })

        res.json({ ok: true, total: categories.length, results: categories })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Server error' })
    }
}

const searchProducts = async (term = '', res = response) => {
    try {
        const isMongoId = isValidObjectId(term)

        if (isMongoId) {
            const product = await Product.findById(term)

            return res.json({ ok: true, results: !!product ? [product] : [] })
        }

        const regex = new RegExp(term, 'i')

        const products = await Product.find({
            $or: [{ name: regex }, { description: regex }, { price: isNaN(term) ? false : Number(term) }],
            $and: [{ isDeleted: false }]
        }).populate('category', 'name')

        res.json({ ok: true, total: products.length, results: products })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Server error' })
    }
}

export const searchController = async (req = request, res = response) => {
    const { collection, term } = req.params

    try {
        if (!validCollections.includes(collection)) return res.status(400).json({ ok: false, msg: `Las colecciones permitidas son: ${validCollections}` })

        switch (collection) {
            case 'users':
                searchUsers(term, res)
                break

            case 'categories':
                searchCategories(term, res)
                break

            case 'products':
                searchProducts(term, res)
                break

            default:
                res.status(500).json({ ok: false, msg: 'Se me olvido hacer esta busqueda' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Server error' })
    }
}