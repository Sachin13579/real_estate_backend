import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/node_real').then(() => {
        console.log("Db connected succesfully 📝")
    }).catch((err) => {
        console.log(`Error in connecting to Mongo:${err}`)
    })
}
export default dbConnection;