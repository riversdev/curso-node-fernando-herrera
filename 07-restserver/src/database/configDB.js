import mongoose from 'mongoose'

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN)

        console.log('DB online')
    } catch (error) {
        throw new Error('Imposible conectar con la bd')
    }
}