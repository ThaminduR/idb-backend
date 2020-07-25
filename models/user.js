const database = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');


//function to fill company data

exports.getCompanyData = async function (req, res) {

    try {
        db = new database();

    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'Database Error' })
        return
    }

    query1 = "SELECT name FROM company WHERE name=?"
    query2 = "CALL AddSurvey(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    query3 = "SELECT id FROM company WHERE name=?"
    query4 = "INSERT INTO propertier_contact_person (id,name,designation,telephone,mobile,email) VALUES (?,?,?,?,?,?)"
    query5 = "INSERT INTO furnace_capacity (id,metal,melting,heating) VALUES (?,?,?,?)"
    query6 = "INSERT INTO machinery (id,machine_type,capacity,value) VALUES (?,?,?,?)"
    query7 = "INSERT INTO furnace (id,furnace_type,fuel) VALUES (?,?,?)"
    query8 = "INSERT INTO metal_processiong (id,metal,melting,heating,temperature) VALUES (?,?,?,?,?)"
    query9 = "INSERT INTO raw_materials (id,metal,origin,state,metal_usage) VALUES (?,?,?,?,?)"
    query10 = "INSERT INTO employees (id,type,local_em,foreign_em) VALUES (?,?,?,?)"
    query11 = "INSERT INTO products (id,product,state,units,weight) VALUES (?,?,?,?)"
    query12 = "INSERT INTO products_sold (id,local_retails,local_companies,foreigh_market) VALUES (?,?,?,?)"
    query13 = "INSERT INTO other_product_sold (id,description,percentage) VALUES (?,?,?)"
    query14 = "INSERT INTO annual_turnover (id,year_range,value) VALUES (?,?,?)"
    query15 = "INSERT INTO business_progression (id,yr1_dir,yr1_percentage,yr2_dir,yr2_percentage) VALUES (?,?,?,?,?)"
    query16 = "INSERT INTO waste_generated (id,type_waste,amount_waste,dispose_method) VALUES (?,?,?,?)"


    try {
        companyName = req.body.companyName
        console.log(companyName)
        name = await db.query(query1, [companyName])

    } catch (error) {
        console.log("error")
        res.send({ 'code': 204, 'message': 'Error Occured' })
        return
    }
    if (name != "") {
        console.log("Company already exists in database")
        res.send({ 'code': 204, 'message': 'Company Exist in Database' })
        return
    }
    else {
            companyName = req.body.companyName,
            province = req.body.province,
            district = req.body.district,
            dsDivision = req.body.dsDivision,
            gnDivision = req.body.gnDivision,
            latitude = req.body.latitude,
            longitude = req.body.longitude,
            address = req.body.address,
            email = req.body.email,
            telenumber = req.body.telenumber,
            fax = req.body.fax,
            website = req.body.website,
            proprietor = req.body.proprietor,
            turnover = req.body.turnover,
            employees = req.body.employees,
            yoe = req.body.yoe,
            business_type = req.body.business_type,
            reg_no = req.body.reg_no,
            industry_reg = req.body.industry_reg,
            industry_reg_no = req.body.industry_reg_no,
            land_area = req.body.land_area,
            land_value = req.body.land_value,
            building_area = req.body.building_area,
            building_value = req.body.building_value,
            machine_value = req.body.machine_value,
            utilities_value = req.body.utilities_value,
            total_capital_investment = req.body.total_capital_investment,
            raw_mat_value = req.body.raw_mat_value,
            semi_goods_value = req.body.semi_goods_value,
            goods_value = req.body.goods_value,
            total_working_capital = req.body.total_capital_investment,
            site_type = req.body.site_type,
            furnace_capacity = req.body.furnace_capacity,
            furnaces = req.body.furnaces,
            machinery = req.body.machinery,
            metal_processing = req.body.metal_processing,
            raw_materials = req.body.raw_materials,
            emp_details = req.body.emp_details,
            products = req.body.products,
            markets = req.body.markets,
            other_markets = req.body.other_markets,
            annual_turnover = req.body.annual_turnover,
            business_progression = req.body.business_progression,
            waste_generated = req.body.waste_generated,
            interviewer = req.body.interviewer,
            yoi = req.body.yoi

        /* Begin transaction */
        await db.connection.beginTransaction(async function (err) {
            if (err) { throw err; }

            try {
                db.query(query2, [companyName, province, district, dsDivision, gnDivision, latitude, longitude, address, telenumber, email, fax, website, turnover, employees,
                    yoe, business_type, reg_no, industry_reg, industry_reg_no, land_area, land_value, building_area, building_value, machine_value, utilities_value,
                    total_capital_investment, raw_mat_value, semi_goods_value, goods_value, total_working_capital, site_type, interviewer, yoi])

            } catch (error) {
                console.log(error)
            }


            try {
                result = await db.query(query3, [companyName])
                
                var companyid = (result[0].id)
                

            } catch (error) {
                console.log(error)
            }

            try {
                for (let index = 0; index < proprietor.length; index++) {
                    const element = proprietor[index];
                    
                    console.log(element.name, element.designation, element.tele, element.mobile, element.email)
                    db.query(query4, [companyid, element.name, element.designation, element.tele, element.mobile, element.email])

                }

            } catch (error) {
                console.log(error)
            }

            try {
                for (let index = 0; index < furnace_capacity.length; index++) {
                    const element = furnace_capacity[index];
                    db.query(query5, [companyid, element.metal, element.melting, element.heating])


                }

            } catch (error) {
                console.log(error)
            }


            try {
                for (let index = 0; index < machinery.length; index++) {
                    const element = furnace_capacity[index];
                    db.query(query6, [companyid, element.type, element.capacity, element.value])


                }

            } catch (error) {
                console.log(error)
            }

            try {
                for (let index = 0; index < furnaces.length; index++) {
                    const element = furnaces[index];
                    db.query(query7, [companyid, element.name, element.fuel])

                }

            } catch (error) {
                console.log(error)
            }


            try {
                for (let index = 0; index < metal_processing.length; index++) {
                    const element = metal_processing[index];
                    db.query(query8, [companyid, element.metal, element.melting, element.heating, element.temp])

                }

            } catch (error) {
                console.log(error)
            }

            try {
                for (let index = 0; index < raw_materials.length; index++) {
                    const element = raw_materials[index];
                    db.query(query9, [companyid, element.metal, element.origin, element.state, element.amount])

                }

            } catch (error) {
                console.log(error)
            }

            try {
                for (let index = 0; index < emp_details.length; index++) {
                    const element = emp_details[index];
                    db.query(query10, [companyid, element.type, element.local, element.foreign])

                }

            } catch (error) {
                console.log(error)
            }

            try {
                for (let index = 0; index < products.length; index++) {
                    const element = products[index];
                    db.query(query11, [companyid, element.name, element.state, element.units, element.weight])

                }

            } catch (error) {
                console.log(error)
            }

            try {
                for (let index = 0; index < markets.length; index++) {
                    const element = markets[index];
                    db.query(query12, [companyid, element.local_retail, element.local_companies, element.export])

                }

            } catch (error) {
                console.log(error)
            }

            try {
                for (let index = 0; index < other_markets.length; index++) {
                    const element = other_markets[index];
                    db.query(query13, [companyid, element.name, element.percentage])

                }

            } catch (error) {
                console.log(error)
            }

            try {

                db.query(query14, [companyid, 2016 - 2017, annual_turnover.y2016_2017])
                db.query(query14, [companyid, 2017 - 2018, annual_turnover.y2017_2018])
                db.query(query14, [companyid, 2018 - 2019, annual_turnover.y2017_2018])



            } catch (error) {
                console.log(error)
            }

            try {

                db.query(query15, [companyid, business_progression.year1_dir, business_progression.year1, business_progression.year2_dir, business_progression.year2])




            } catch (error) {
                console.log(error)
            }

            try {
                for (let index = 0; index < waste_generated.length; index++) {
                    const element = waste_generated[index];
                    db.query(query16, [companyid, element.type, element.amount, element.disposal])

                }

            } catch (error) {
                console.log(error)
            }


            db.connection.commit(function (err) {
                if (err) {
                    db.rollback(function () {
                        throw err;
                    });
                }
                console.log('Transaction Completed Successfully.');
                db.connection.end();
                res.send({ 'code': 200, 'message': 'Success' })
            });
        });
    }
}


