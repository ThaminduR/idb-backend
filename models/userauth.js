const database = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const jwtExpirySeconds = 86400

exports.login = async function (req, res) {

    db = new database()
    username = req.body.username
    password = req.body.password
    query = 'SELECT * FROM login_details WHERE username = ?'

    try {
        results = await db.query(query, [username])
        console.log("LOL")
    } catch (err) {
        res.send({
            "code": 400,
            "failed": "error ocurred"
        })
        return
    }
    if (results.length > 0) {
        hash = await bcrypt.compare(password, results[0].hpassword)
        if (hash) {

            user = {
                username: username,
            }
            const accessToken = jwt.sign(user, process.env.JWTSECRET, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            })

            res.cookie("authtoken", accessToken, { httpOnly: true })
            res.send({ "code": 200, "message": "Logging successful" })

        } else {
            res.send({
                "code": 401,
                "failure": "Invalid Credentials !"
            })
        }
    } else {
        res.send({
            "code": 401,
            "failure": "Invalid Credentials !"
        })
    }
}

exports.logout = function (req, res) {
    authtoken = req.cookies['authtoken']
    client = req.redis
    decoded = jwt.verify(authtoken, process.env.JWTSECRET)
    client.del(decoded.username);
    res.cookie('authtoken', { maxAge: Date.now() })
    res.send({ "code": 200, "message": "Logged Out" })
}