const express = require('express')
const router = express.Router()
const auth = require('../models/userauth')
const middleware = require('../models/middleware')
const userrouter = require('./routes')

router.post('/login', [middleware.notloggedin], (req, res) => { auth.login(req, res) })
// router.post('/register', middleware.notloggedin, (req, res) => { auth.register(req, res) })
router.get('/logout', [middleware.verifytoken], (req, res) => { auth.logout(req, res) })

router.use('/user', userrouter)

module.exports = router;