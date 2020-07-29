const express = require('express')
const router = express.Router()
const middleware = require('../models/middleware')
const User = require('../models/user')

router.get('/test', middleware.verifytoken, (req, res) => { User.test(req, res) })
router.post('/addSurvey', middleware.verifytoken, (req, res) => { User.getCompanyData(req, res) })
router.post('/viewSurvey', middleware.verifytoken, (req, res) => { User.viewCompanyData(req, res) })


module.exports = router;