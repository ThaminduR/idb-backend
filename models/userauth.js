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
    } catch (err) {
        res.send({
            "code": 400,
            "failed": "error ocurred"
        })
        return
    }
    if (results.length > 0) {
        hash = await bcrypt.compare(password, results[0].password)
        if (hash) {

            user = {
                username: username,
            }
            const accessToken = jwt.sign(user, process.env.JWTSECRET, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            })

            res.cookie("authtoken", accessToken, { httpOnly: true })
            res.cookie("username", username)
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
    res.clearCookie('authtoken')
    res.clearCookie('username')
    res.send({ "code": 200, "message": "Logged Out" })
}