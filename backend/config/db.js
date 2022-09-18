const mongoose = require('mongoose')

const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD)

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(
            `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ek2x1o3.mongodb.net/APP_GOALS?retryWrites=true&w=majority`
        ).then ( (conn) => {
            console.log(`MongoDB connected: ${conn.connection.host}`.blue.underline)
        } )

    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}




module.exports = connectDB