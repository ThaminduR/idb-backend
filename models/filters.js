const database = require('../config/db');
const { query } = require('express');


exports.getFilteredData = async function (req, res) {
    try {
        db = new database();

    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'DATABASE ERROR.TRY AGAIN' })
    }
    district = req.body.district
    scale = req.body.scale

    metal = req.body.metal
    metalrange = req.body.metalrange
    consumption = req.body.metalcapacity

    furnace = req.body.furnace
    furnacerange = req.body.furnacerange
    capacity = req.body.furnacecapacity

    product = req.body.product
    productrange = req.body.productrange
    quantity = req.body.productcapacity

    market = req.body.market

    if (district === '') {
        district = null
    }
    if (scale === '') {
        scale = null
    }

    if (market === "Local") {
        parameters = [1, null, district, scale]
    } else if (market === "Export") {
        parameters = [null, 1, district, scale]
    } else if (market == "Both") {
        parameters = [1, 1, district, scale]
    } else {
        parameters = [null, null, district, scale]
    }
    // console.log(parameters)




    try {
        var query = "SELECT id,name FROM company NATURAL JOIN location WHERE id IN (SELECT id FROM company NATURAL JOIN products_sold WHERE (local_retails+local_companies)>=COALESCE(?,local_retails+local_companies) AND foreigh_market>=COALESCE(?,foreigh_market) ) AND district=COALESCE(?,district) AND id IN (SELECT id FROM company NATURAL JOIN company_category WHERE turnover_category=COALESCE(?,turnover_category))"

        


        if (metal != '') {
            query += " AND id IN (SELECT id FROM (SELECT id,SUM(metal_usage) AS metal_usage FROM raw_materials WHERE metal=? GROUP BY (id)) AS t1"
            parameters.push(metal)


            if (consumption >= 0 && consumption!='') {
                
                if (metalrange === "Greater") {
                    query += " WHERE metal_usage > ?)"
                    parameters.push(consumption)
                } else if (metalrange === "Less") {
                    query += " WHERE metal_usage <= ?)"
                    parameters.push(consumption)
                } else {
                    query += ')'
                }
            } else {
                query += ')'
            }
        }

        if (furnace != '') {
            parameters.push(furnace)
           // query += " AND id IN (SELECT id FROM furnace WHERE furnace_type=?"
            query +=" AND id IN (SELECT id FROM (SELECT id,SUM(capacity) AS capacity FROM furnace WHERE furnace_type=? GROUP BY (id)) AS t2"



            if (capacity >= 0 && capacity!='') {
                
                if (furnacerange === "Greater") {
                    query += " WHERE capacity > ?)"
                    parameters.push(capacity)
                } else if (furnacerange === "Less") {
                    query += " WHERE capacity <= ?)"
                    parameters.push(capacity)
                } else {
                    query += ')'
                }
            } else {
                query += ')'
            }
        }

        // console.log(query)

        if (product != '') {
            parameters.push(product)

            query +=" AND id IN (SELECT id FROM (SELECT id,SUM(units) AS units FROM products WHERE product=? GROUP BY (id)) AS t3"


            //query += " AND id in (SELECT id FROM products WHERE product=?"
            console.log(productrange)
            if (quantity >= 0 && quantity!="") {
                
                if (productrange === "Greater") {
                    query += " WHERE units > ?)"
                    parameters.push(quantity)
                } else if (productrange === "Less") {
                    query += " WHERE units <= ?)"
                    parameters.push(quantity)
                } else {
                    query += ')'
                }



            } else {
                query += ')'
            }
        }
        // console.log(query)

        // console.log(parameters)

        result = await db.query(query, parameters)

        // console.log(result)

        res.send({ 'code': 200, 'message': 'Success', 'data': result })



    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'DATABASE ERROR.TRY AGAIN' })
    }
}

exports.getFurnanceData = async function (req, res) {  //Furnace Capacity
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



exports.getProductionData = async function (req, res) {   //Production Data
    try {
        db = new database();
    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'DATABASE ERROR.TRY AGAIN' })
    }

    metal = req.body.metal





    query1 = "SELECT district,SUM(weight) AS total FROM `products` NATURAL JOIN location WHERE metal=? AND state=? GROUP BY district"
    query2 = "SELECT district,SUM(capacity) AS total FROM location NATURAL JOIN furnace WHERE id in (SELECT id FROM products WHERE metal=? AND state=?) GROUP BY district"

    try {
        productList = await db.query(query1, [metal, "Existing"])
        furnaceList = await db.query(query2, [metal, "Existing"])




        res.send({ 'code': 200, 'message': 'success', "products": productList, "furnaces": furnaceList })


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
    query2 = "SELECT district,SUM(metal_usage) AS total FROM `raw_materials` NATURAL JOIN location WHERE metal=? GROUP BY district"

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


exports.getMetalCategories = async function (req, res) {  //Metal Categories
    try {
        db = new database();
    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'DATABASE ERROR.TRY AGAIN' })
    }


    query = "SELECT district,COUNT(name) AS total FROM company NATURAL JOIN location JOIN raw_materials USING (id) WHERE metal=? GROUP BY district"
    query2 = "SELECT district,COUNT(name) AS total FROM company NATURAL JOIN location JOIN raw_materials USING (id) WHERE metal=? OR metal=? OR metal=? OR metal=? OR metal=? OR metal=? OR metal=? OR metal=? GROUP BY district"

    try {

        brass = await db.query(query, ["Brass"])
        aluminum = await db.query(query, ["Aluminum"])
        iron = await db.query(query, ["Iron"])
        castIron = await db.query(query, ["Cast Iron"])
        other = await db.query(query2, ["Stainless Steel", 'Magnesium', 'Copper', 'Zinc', 'LMS', 'High Carbon Steel', 'Manganese Steel', 'Other'])

        industryData = { "Brass": brass, "Aluminum": aluminum, "Iron": iron, "Cast Iron": castIron, "Other": other }
        // console.log(industryData)

        res.send({ 'code': 200, 'message': 'success', 'data': industryData })


    } catch (error) {
        console.log(error)
        res.send({ 'code': 204, 'message': 'Error Occured.Try Again' })
        return
    }


}

exports.getMachineryInvestmentData = async function (req, res) { //Machinery Investment
    try {
        db = new database();
    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'DATABASE ERROR.TRY AGAIN' })
    }


    query = "SELECT district,SUM(value) AS total FROM location NATURAL JOIN machinery GROUP BY district"

    try {

        investment = await db.query(query)


        res.send({ 'code': 200, 'message': 'success', 'data': investment })


    } catch (error) {
        console.log(error)
        res.send({ 'code': 204, 'message': 'Error Occured.Try Again' })
        return
    }


}

exports.getTotalInvestment = async function (req, res) { //Total Investment
    try {
        db = new database();
    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'DATABASE ERROR.TRY AGAIN' })
    }



    query1 = "SELECT district,SUM(building_value+land_value) AS totalFixed,SUM(raw_material+semi_finished+finished) AS totalWorking FROM building_capital NATURAL JOIN land_capital JOIN working_captial USING (id) JOIN location USING (id) GROUP BY district"
    try {
        result = await db.query(query1)
        res.send({ 'code': 200, 'message': 'success', 'Data': result })
    } catch (error) {
        console.log(error)
        res.send({ 'code': 204, 'message': 'Error Occured.Try Again' })
        return
    }

}

exports.getAvgProductionData = async function (req, res) { //Average Production and Expected Production


    try {
        db = new database();
    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'DATABASE ERROR.TRY AGAIN' })
    }

    state = req.body.state
    product = req.body.product

    query1 = "SELECT district,SUM(weight) AS total FROM products NATURAL JOIN location WHERE product=? AND state=? GROUP BY district"
    query2 = "SELECT district,SUM(weight) AS total FROM products NATURAL JOIN location WHERE state=? GROUP BY district"
    try {
        if (product === "Total") {
            result = await db.query(query2, [state])
            res.send({ 'code': 200, 'message': 'success', 'data': result })


        } else {

            result = await db.query(query1, [product, state])
            res.send({ 'code': 200, 'message': 'success', 'data': result })
        }
    } catch (error) {
        console.log(error)
        res.send({ 'code': 204, 'message': 'Error Occured.Try Again' })
        return
    }






}

