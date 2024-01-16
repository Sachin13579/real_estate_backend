import mongoose from "mongoose";
import { dbUrl } from './config.js'
console.log(process.env.stagingDbUri)
const dbConnection = () => {
    mongoose.connect(dbUrl).then(() => {
        console.log("Db connected succesfully 📝")
    }).catch((err) => {
        console.log(`Error in connecting to Mongo:${err}`)
    })
}
export default dbConnection;