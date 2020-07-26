const jwt = require('jsonwebtoken')

exports.verifytoken = function (req, res, next) {
    const token = req.cookies["authtoken"]

    if (token == null) return res.send({ "code": 401, "message": "Unauthorized Access" })

    jwt.verify(token, process.env.JWTSECRET, (err, user) => {
        if (err) {
            res.clearCookie('authtoken')
            res.clearCookie('username')
            res.send({
                "code": 401,
                "message": "Unauthorized Access"
            })
            return
        } else {
            next()
        }
    })
}

exports.notloggedin = function (req, res, next) {
    const token = req.cookies['authtoken']
    if (token == null) {
        next()
    } else {
        jwt.verify(token, process.env.JWTSECRET, (err, user) => {
            if (err) {
                next()
            } else {
                if (user.user_type == "user") {
                    res.send({
                        "code": 200,
                        "message": "Logged In"
                    })
                }
            }
        })
    }
}

