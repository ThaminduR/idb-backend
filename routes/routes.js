const express = require('express')
const router = express.Router()
const middleware = require('../models/middleware')
const User = require('../models/user')
const Filter = require('../models/filters')

router.get('/test', middleware.verifytoken, (req, res) => { User.test(req, res) })
router.post('/addSurvey', middleware.verifytoken, (req, res) => { User.getCompanyData(req, res) })
router.post('/viewSurveys', middleware.verifytoken, (req, res) => { User.viewSurveys(req, res) })
router.post('/viewCompany', middleware.verifytoken, (req, res) => { User.viewCompanyData(req, res) })
router.post('/viewInBrief', middleware.verifytoken, (req, res) => { User.viewInBrief(req, res) })
router.post('/deleteCompany', middleware.verifytoken, (req, res) => { User.deleteSurveryForm(req, res) })
router.get('/deletedSurveys', middleware.verifytoken, (req, res) => { User.viewDeleted(res) })
router.post('/getFurnanceData', middleware.verifytoken, (req, res) => { Filter.getFurnanceData(req,res) }) //Furnace Capacity
router.post('/getProductionData', middleware.verifytoken, (req, res) => { Filter.getProductionData(req,res) }) //Production Data
router.post('/getRawMaterialData', middleware.verifytoken, (req, res) => { Filter.getRawMaterialData(req,res) })//Raw Materials
router.post('/getAvgProductionData', middleware.verifytoken, (req, res) => { Filter.getAvgProductionData(req,res) }) //Average Production and Expected Production
router.post('/getMetalCategories', middleware.verifytoken, (req,res) => { Filter.getMetalCategories(req,res) })//Metal Categories
router.post('/getMachineryInvestmentData', middleware.verifytoken, (req,res) => { Filter.getMachineryInvestmentData(req,res) }) //Machinery Investment
router.post('/getTotalInvestment', middleware.verifytoken, (req,res) => { Filter.getTotalInvestment(req,res) }) //Total Investment

module.exports = router;