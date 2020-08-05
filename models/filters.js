const database = require('../config/db');


exports.getFurnanceData = async function (req,res) {
    try {
        db = new database();
    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'DATABASE ERROR.TRY AGAIN' })
    }
    
    furnacetype=req.body.furnace
    capacity=req.body.capacity
    range=req.body.range

    


    query1 = "SELECT name,district FROM (furnace NATURAL JOIN location) JOIN company USING (id) ORDER BY district WHERE furnace_type=? AND capacity>=?"
    query2="SELECT name,district FROM (furnace NATURAL JOIN location) JOIN company USING (id) ORDER BY district WHERE furnace_type=? AND capacity<?"
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

        if(range=="Greater Than"){
        result = await db.query(query1,[furnacetype,capacity])
        }else{
            result = await db.query(query2,[furnacetype,capacity])
        }
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