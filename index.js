const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var cookieParser = require('cookie-parser')
var cors = require('cors')

require('dotenv').config()

const port = process.env.PORT
const address = process.env.SERVER_ADDRESS

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const corsOptions = {
    origin: [
        "http://" + process.env.HOST
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
}

app.use(cors(corsOptions))

const index = require('./routes/indexRoutes')
app.use('/api', index);

app.listen(port, address, () => console.log("Server Started. Running on " + process.env.SERVER_ADDRESS + " in " + process.env.PORT))
//WIhtout pm2 reload