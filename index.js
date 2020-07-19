const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var cookieParser = require('cookie-parser')
var cors = require('cors')

require('dotenv').config()

const port = process.env.PORT
const address = process.env.address

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://127.0.0.1",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
}

app.use(cors(corsOptions))



const index = require('./routes/indexRoutes')
app.use('/', index);

app.listen(port, address, () => console.log("Server Started. Running on localhost:" + process.env.PORT))