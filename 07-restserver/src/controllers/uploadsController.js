import { request, response } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { deleteFile, fileExists, uploadFile } from '../helpers/index.js'
import { Product, User } from '../models/index.js'

cloudinary.config({
    cloud_name: 'dwjujtv6q',
    api_key: '932859872792596',
    api_secret: 'iGgbQaQ_Ggyy13NeWdwsZHavsiw',
    secure: true,
})

export const uploadFiles = async (req = request, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0) return res.status(400).json({ ok: false, msg: 'No hay archivos en la peticion' })

    const { folder = 'general' } = req.body

    try {
        const reqFiles = Object.keys(req.files).map(name => req.files[name])

        const files = await Promise.all(reqFiles.map(file => uploadFile({ file, folder })))

        res.status(201).json({ ok: true, files })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Server error' })
    }
}

export const updateImage = async (req = request, res = response) => {
    const { collection, id } = req.params
    const { file } = req.files

    try {
        let model = ''

        switch (collection) {
            case 'users':
                model = await User.findById(id)
                break

            case 'products':
                model = await Product.findById(id)
                break

            default:
                return res.status(500).json({ ok: false, msg: 'Collection not validated' })
        }

        if (!model) return res.status(400).json({ ok: false, msg: `No existe en ${collection} un registro con el id ${id}` })

        if (model.img) deleteFile({ file: model.img, folder: collection })

        model.img = await uploadFile({ file, folder: collection })

        await model.save()

        res.json({ ok: true, record: model })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Server error' })
    }
}

export const getImage = async (req = request, res = response) => {
    const { collection, id } = req.params

    try {
        let model = ''

        switch (collection) {
            case 'users':
                model = await User.findById(id)
                break

            case 'products':
                model = await Product.findById(id)
                break

            default:
                return res.status(500).json({ ok: false, msg: 'Collection not validated' })
        }

        if (!model) return res.status(400).json({ ok: false, msg: `No existe en ${collection} un registro con el id ${id}` })

        const filePath = fileExists({ file: model.img, folder: collection })

        res.sendFile(filePath)
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Server error' })
    }
}

export const updateCloudinaryImage = async (req = request, res = response) => {
    const { collection, id } = req.params
    const { file } = req.files

    try {
        let model = ''

        switch (collection) {
            case 'users':
                model = await User.findById(id)
                break

            case 'products':
                model = await Product.findById(id)
                break

            default:
                return res.status(500).json({ ok: false, msg: 'Collection not validated' })
        }

        if (!model) return res.status(400).json({ ok: false, msg: `No existe en ${collection} un registro con el id ${id}` })

        if (model.img) {
            const [imageName] = model.img.split('/').reverse()
            const [publicId, extension] = imageName.split('.')

            await cloudinary.uploader.destroy(publicId)
        }

        const { secure_url } = await cloudinary.uploader.upload(file.tempFilePath)

        model.img = secure_url

        await model.save()

        res.json({ ok: true, record: model })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Server error' })
    }
}