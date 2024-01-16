import express from 'express';
import dbConnection from './config/db.config.js';
import routes from './routes/index.js';
import * as dbModels from './model/index.js';
import morgan from 'morgan';
import 'dotenv/config';


let app = express();
dbConnection()
let port = process.env.PORT || 8000;
global.Models = dbModels;
app.use(express.json());
app.use(morgan("dev"))
app.use("/api", routes)


app.listen(port, () => {
    console.log(`listening on port ${port}`);
})