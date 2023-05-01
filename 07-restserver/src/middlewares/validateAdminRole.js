import { request, response } from 'express'

export const validateAdminRole = (req = request, res = response, next) => {
    const user = req.user

    if (!user) return res.status(500).json({ ok: false, msg: 'No existe el usuario para verificar el role' })

    if (user.role !== 'ADMIN_ROLE') return res.status(401).json({ ok: false, msg: `${user.name} no es admin. No tiene permiso !` })

    next()
}