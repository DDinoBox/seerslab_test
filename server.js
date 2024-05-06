import express from 'express'
import dotenv from 'dotenv'
import { dataSource }  from './models/dataSource.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const startServer = () => {
    // Connection test
    dataSource.initialize()
    .then(() => {
        console.log("Data source has benn initialized");
    })
    .catch((err) => {
        console.log("Data source has failed to connect local Database", err)
    })

    // Connection test
    app.get('/ping', (req, res) => {
        res.status(200).json({'message' : 'pong'});
    });

    // Server start
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
};
    
startServer();