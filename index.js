import express from 'express';
import dbConnection from './config/db.config.js'
import routes from './routes/index.js'

let app = express();
dbConnection()
let port = process.env.PORT || 8000;
app.use(express.json());
app.use("/api", routes)

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})