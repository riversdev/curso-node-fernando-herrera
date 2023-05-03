import { request, response } from 'express'

export const validateFile = (req = request, res = response, next) => {
    if (!req.files?.file)
        return res.status(400).json({ ok: false, msg: 'No existe file en la peticion' })

    next()
}