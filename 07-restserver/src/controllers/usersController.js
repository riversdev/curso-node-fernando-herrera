import { request, response } from 'express'

export const getUsers = (req = request, res = response) => {
    res.json({ ok: true, message: 'get api controller' })
}

export const getUser = (req = request, res = response) => {
    const params = req.params
    const query = req.query

    res.json({ ok: true, message: 'get api controller', params, query })
}

export const postUser = (req = request, res = response) => {
    const user = req.body

    res.status(201).json({ ok: true, user })
}

export const putUser = (req = request, res = response) => {
    res.json({ ok: true, message: 'put api controller' })
}

export const deleteUser = (req = request, res = response) => {
    res.json({ ok: true, message: 'delete api controller' })
}