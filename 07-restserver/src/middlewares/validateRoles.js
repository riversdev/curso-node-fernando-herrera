import { request, response } from 'express'

export const validateRoles = (roles = []) => (req = request, res = response, next) => {
    const user = req.user

    if (!user) return res.status(500).json({ ok: false, msg: 'No existe el usuario para verificar el role' })

    if (!roles.includes(user.role)) return res.status(401).json({ ok: false, msg: `${user.name} no tiene permiso !` })

    next()
}