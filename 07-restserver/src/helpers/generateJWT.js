import jsonwebtoken from 'jsonwebtoken'

export const generateJWT = (uid = '') => new Promise((resolve, reject) => {
    const payload = { uid }

    jsonwebtoken.sign(
        payload,
        process.env.SECRETKEY,
        { expiresIn: '4h' },
        (error, token) => {
            if (error) {
                console.log(error)
                reject('Imposible generar el token')
            } else {
                resolve(token)
            }
        }
    )
})