const database = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
var jwtExpirySeconds = 86400 //24Hrs
const rememberExpire = 1209600 //14Days

exports.login = async function (req, res) {

    db = new database()
    username = req.body.username
    password = req.body.password
    rememberMe = req.body.rememberMe

    query = 'SELECT * FROM login_details WHERE username = ?'


    try {
        results = await db.query(query, [username])
    } catch (err) {
        res.send({
            "code": 204,
            "failed": "Database Error. Try Again"
        })
        return
    }
    if (results.length > 0) {
        hash = await bcrypt.compare(password, results[0].password)
        if (hash) {

            user = {
                username: username,
            }

            if (rememberMe) {
                jwtExpirySeconds = rememberExpire
            }

            const accessToken = jwt.sign(user, process.env.JWTSECRET, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            })

            res.cookie("authtoken", accessToken, { httpOnly: true })
            res.cookie("username", username)
            res.send({ "code": 200, "message": "Sign In successful !" })

        } else {
            res.send({
                "code": 401,
                "message": "Invalid Credentials !"
            })
        }
    } else {
        res.send({
            "code": 401,
            "message": "Invalid Credentials !"
        })
    }
}

exports.logout = function (req, res) {
    res.clearCookie('authtoken')
    res.clearCookie('username')
    res.send({ "code": 200, "message": "Log Out Successful" })
}