import { request, response } from 'express'
import { validationResult } from 'express-validator'

export const itemsValidator = (req = request, res = response, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors })

    next()
}