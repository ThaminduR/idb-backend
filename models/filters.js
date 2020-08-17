const database = require('../config/db');


exports.getFurnanceData = async function (req, res) {
    try {
        db = new database();
    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'DATABASE ERROR.TRY AGAIN' })
    }

    furnacetype = req.body.furnace
    capacity = Number(req.body.capacity)
    range = req.body.range




    query1 = "SELECT name,district FROM (furnace NATURAL JOIN location) JOIN company USING (id) WHERE furnace_type=? AND capacity>=?  ORDER BY district"
    query2 = "SELECT name,district FROM (furnace NATURAL JOIN location) JOIN company USING (id) WHERE furnace_type=? AND capacity<? ORDER BY district"
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
    const companydistrictlist = {}

    try {

        if (range == "Greater") {
            result = await db.query(query1, [furnacetype, capacity])
        } else {
            result = await db.query(query2, [furnacetype, capacity])
        }
        //console.log(result)
    } catch (error) {
        console.log(error)
        res.send({ 'code': 204, 'message': 'Error Occured.Try Again' })
        return
    }
    try {
        districts.forEach(selecteddistrict => {
            // console.log(selecteddistrict)
            companylist = []
            result.forEach(company => {
                // console.log(company)

                if (company.district == selecteddistrict) {
                    // console.log("YES")
                    companylist.push(company.name)

                }
            });
            // console.log(companylist)
            companydistrictlist[selecteddistrict] = companylist

        });
        res.send({ 'code': 200, 'message': 'Success', 'companydistrictlist': companydistrictlist })
    } catch (error) {
        console.log(error)
        res.send({ 'code': 204, 'message': 'Error Occured.Try Again' })
        return
    }





}



exports.getProductData = async function (req, res) {   //Average Production and Expected Production
    try {
        db = new database();
    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'DATABASE ERROR.TRY AGAIN' })
    }

    metal = req.body.metal
    state = req.body.state




    query1 = "SELECT district,SUM(weight) FROM `products` NATURAL JOIN location WHERE metal=? AND state=? GROUP BY district"
    // query2 = "SELECT district,SUM(metal_usage) FROM `raw_materials` NATURAL JOIN location WHERE metal=? GROUP BY district"

    try {
        productList = await db.query(query1, [metal, state])
        // rawMaterialList= await db.query(query2,[metal])


        res.send({ 'code': 200, 'message': 'success', 'data': productList })


    } catch (error) {
        console.log(error)
        res.send({ 'code': 204, 'message': 'Error Occured.Try Again' })
        return
    }





}

exports.getRawMaterialData = async function (req, res) {     //Raw Materials
    try {
        db = new database();
    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'DATABASE ERROR.TRY AGAIN' })
    }

    metal = req.body.metal




    // query1 = "SELECT district,SUM(weight) FROM `products` NATURAL JOIN location WHERE metal=? AND state=? GROUP BY district"
    query2 = "SELECT district,SUM(metal_usage) FROM `raw_materials` NATURAL JOIN location WHERE metal=? GROUP BY district"

    try {
        // productList=await db.query(query1,[metal,"Existing"])
        rawMaterialList = await db.query(query2, [metal])


        res.send({ 'code': 200, 'message': 'success', 'data': rawMaterialList })


    } catch (error) {
        console.log(error)
        res.send({ 'code': 204, 'message': 'Error Occured.Try Again' })
        return
    }





}


exports.getIndustryData = async function (req,res) {
    try {
        db = new database();
    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'DATABASE ERROR.TRY AGAIN' })
    }


    query = "SELECT district,COUNT(name) FROM company NATURAL JOIN location JOIN raw_materials USING (id) WHERE metal=? GROUP BY district"
    query2 = "SELECT district,COUNT(name) FROM company NATURAL JOIN location JOIN raw_materials USING (id) WHERE metal=? OR metal=? OR metal=? OR metal=? OR metal=? OR metal=? OR metal=? OR metal=? GROUP BY district"

    try {

        brass = await db.query(query, ["Brass"])
        aluminum = await db.query(query, ["Aluminum"])
        iron = await db.query(query, ["Iron"])
        castIron = await db.query(query, ["Cast Iron"])
        other = await db.query(query2, ["Stainless Steel", 'Magnesium', 'Copper', 'Zinc', 'LMS', 'High Carbon Steel', 'Manganese Steel', 'Other'])

        industryData = { "Brass": brass, "Aluminum": aluminum, "Iron": iron, "Cast Iron": castIron, "Other": other }
        console.log(industryData)

        res.send({ 'code': 200, 'message': 'success', 'data': industryData })


    } catch (error) {
        console.log(error)
        res.send({ 'code': 204, 'message': 'Error Occured.Try Again' })
        return
    }


}

exports.getMachineryInvestmentData = async function (req,res) {
    try {
        db = new database();
    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'DATABASE ERROR.TRY AGAIN' })
    }


    query = "SELECT district,SUM(total)FROM company NATURAL JOIN location JOIN capital_investment USING (id) GROUP BY district"
    
    try {

        investment = await db.query(query)
        

        res.send({ 'code': 200, 'message': 'success', 'data': investment })


    } catch (error) {
        console.log(error)
        res.send({ 'code': 204, 'message': 'Error Occured.Try Again' })
        return
    }


}


// exports.getProductionData = async function (req, res) {


//     try {
//         db = new database();
//     } catch (error) {
//         console.log(error);
//         res.send({ 'code': 204, 'message': 'DATABASE ERROR.TRY AGAIN' })
//     }

//     state = req.body.state

//     query1 = "SELECT product,SUM(weight) FROM `products` NATURAL JOIN location WHERE district=? AND state=? GROUP BY product"
//     const districts = ['Kandy',
//         'Matale',
//         'Nuwara Eliya',
//         'Ampara',
//         'Batticaloa',
//         'Trincomalee',
//         'Anuradhapura',
//         'Polonnaruwa',
//         'Kurunegala',
//         'Puttalam',
//         'Jaffna',
//         'Kilinochchi',
//         'Mannar',
//         'Mullaitivu',
//         'Vavuniya',
//         'Kegalle',
//         'Ratnapura',
//         'Galle',
//         'Hambantota',
//         'Matara',
//         'Badulla',
//         'Moneragala',
//         'Colombo',
//         'Gampaha',
//         'Kalutara']
//     const productionDistrictList = []

//     try {



//         await districts.forEach( district => {
//             result = JSON.stringify(db.query(query1, [district, state]))

//             resultList = {
//                 district,
//                 result
//             }


//             await productionDistrictList.push(resultList)




//         });

//         console.log(productionDistrictList)
//         res.send({ 'code': 200, 'message': 'success', 'Data': { "productionDistrictList": productionDistrictList } })
//     } catch (error) {
//         console.log(error)
//         res.send({ 'code': 204, 'message': 'Error Occured.Try Again' })
//         return
//     }






// }

