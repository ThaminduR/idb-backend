const express = require('express')
const router = express.Router()
const middleware = require('../models/middleware')
const User = require('../models/user')
const Filter = require('../models/filters')

router.get('/test', middleware.verifytoken, (req, res) => { User.test(req, res) })
router.post('/addSurvey', middleware.verifytoken, (req, res) => { User.getCompanyData(req, res) })
router.post('/viewSurveys', middleware.verifytoken, (req, res) => { User.viewSurveys(req, res) })
router.post('/viewCompany', middleware.verifytoken, (req, res) => { User.viewCompanyData(req, res) })
router.post('/deleteCompany', middleware.verifytoken, (req, res) => { User.deleteSurveryForm(req, res) })
router.get('/deletedSurveys', middleware.verifytoken, (req, res) => { User.viewDeleted(res) })
router.post('/getFurnanceData', middleware.verifytoken, (req, res) => { Filter.getFurnanceData(req,res) })


module.exports = router;