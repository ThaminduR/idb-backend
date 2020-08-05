const database = require('../config/db');
const { query } = require('express');

exports.getFurnanceData = async function (res) {
    try {
        db = new database();
    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'DATABASE ERROR.TRY AGAIN' })
    }

    query1 = "SELECT name,district FROM (furnace NATURAL JOIN location) JOIN company USING (id) ORDER BY district"
    const districts = ['Kandy',
        'Matale',
        'Nuwara Eliya',
        'Ampara',
        'Batticaloa',
        'Trincomalee',
        'Anuradhapura',
        'Polonnaruwa',
        'Kurunegala',
        'Puttalam',
        'Jaffna',
        'Kilinochchi',
        'Mannar',
        'Mullaitivu',
        'Vavuniya',
        'Kegalle',
        'Ratnapura',
        'Galle',
        'Hambantota',
        'Matara',
        'Badulla',
        'Moneragala',
        'Colombo',
        'Gampaha',
        'Kalutara']
    const companydistrictlist=[]

    try {
        result = await db.query(query1)
        //console.log(result)
    } catch (error) {
        console.log("error")
        res.send({ 'code': 204, 'message': 'Error Occured.Try Again' })
        return
    }
    try{
    districts.forEach(selecteddistrict => {
        // console.log(selecteddistrict)
        districtCompany={}
        companylist=[]
        result.forEach(company => {
            // console.log(company)
            
            if (company.district==selecteddistrict) {
                // console.log("YES")
                companylist.push(company.name)
                
            }
        });
        // console.log(companylist)
        districtCompany={'district':selecteddistrict,'companyList':companylist}
        companydistrictlist.push(districtCompany)

    });
    res.send({ 'code': 200, 'message': 'Success', 'companydistrictlist': companydistrictlist })
}catch(error){
    console.log("error")
        res.send({ 'code': 204, 'message': 'Error Occured.Try Again' })
        return
}

    



}