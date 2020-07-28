const database = require('../config/db')

exports.test = function (req, res) {
    res.send({ 'code': 401, 'message': 'It Works !' })
}

exports.getCompanyData = async function (req, res) {

    try {
        db = new database();

    } catch (error) {
        console.log(error);
        res.send({ 'code': 204, 'message': 'Database Error.Try Again' })
        return
    }

    query1 = "SELECT name FROM company WHERE name=?"
    query2 = "CALL AddSurvey(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    query3 = "SELECT id FROM company WHERE name=?"
    query4 = "INSERT INTO propertier_contact_person (id,name,designation,telephone,mobile,email) VALUES (?,?,?,?,?,?)"
    query5 = "INSERT INTO furnace_capacity (id,metal,melting,heating) VALUES (?,?,?,?)"
    query6 = "INSERT INTO machinery (id,machine_type,capacity,value) VALUES (?,?,?,?)"
    query7 = "INSERT INTO furnace (id,furnace_type,fuel) VALUES (?,?,?)"
    query8 = "INSERT INTO metal_processing (id,metal,melting,heating,temperature) VALUES (?,?,?,?,?)"
    query9 = "INSERT INTO raw_materials (id,metal,origin,state,metal_usage) VALUES (?,?,?,?,?)"
    query10 = "INSERT INTO employees (id,type,local_em,foreign_em) VALUES (?,?,?,?)"
    query11 = "INSERT INTO products (id,metal,product,state,units,weight) VALUES (?,?,?,?,?,?)"
    query12 = "INSERT INTO products_sold (id,local_retails,local_companies,foreigh_market) VALUES (?,?,?,?)"
    query13 = "INSERT INTO other_product_sold (id,description,percentage) VALUES (?,?,?)"
    query14 = "INSERT INTO annual_turnover (id,year_range,value) VALUES (?,?,?)"
    query15 = "INSERT INTO business_progression (id,yr1_dir,yr1_percentage,yr2_dir,yr2_percentage) VALUES (?,?,?,?,?)"
    query16 = "INSERT INTO waste_generated (id,type_waste,amount_waste,dispose_method) VALUES (?,?,?,?)"
    query17="INSERT INTO energy_consumption (id,type,state,units) VALUES (?,?,?,?)"

    try {
        companyName = req.body.companyName
        name = await db.query(query1, [companyName])

    } catch (error) {
        console.log("error")
        res.send({ 'code': 204, 'message': 'Error Occured.Try Again' })
        return
    }

    if (name != "") {
        console.log("Company already exists in database")
        res.send({ 'code': 204, 'message': 'Company Exist in Database.Try Again' })
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
            local_employees = req.body.local_employees,
            foreign_employees = req.body.foreign_employees,
            yoe = req.body.yoe,
            business_type = req.body.business_type,
            reg_no = req.body.reg_no,
            registered_place=req.body.reg_place,
            industry_reg = req.body.industry_reg,
            industry_reg_no = req.body.industry_reg_no,
            industry_registered_place=req.body.industry_reg_place,
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
            owned_site = req.body.owned_site,
            rented_site = req.body.rented_site,
            furnace_capacity = req.body.furnace_capacity,
            furnances = req.body.furnaces,
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
            yoi = req.body.yoi,
            area = req.body.floor_area,
            usage_steel=req.body.under_heating,
            enerygy_consumption = req.body.enerygy_consumption

        //Commit

        try {
            await db.query("START TRANSACTION")

            await db.query(query2, [companyName, province, district, dsDivision, gnDivision, latitude, longitude, address, telenumber, email, fax, website, turnover, local_employees,foreign_employees,
                yoe, business_type, reg_no,registered_place, industry_reg, industry_reg_no,industry_registered_place, land_area, land_value, building_area, building_value, machine_value, utilities_value,
                total_capital_investment, raw_mat_value, semi_goods_value, goods_value, total_working_capital, owned_site,rented_site, interviewer, yoi,area,usage_steel])

            result = await db.query(query3, [companyName])
            var companyid = (result[0].id)

            for (let index = 0; index < proprietor.length; index++) {
                const element = proprietor[index];
                await db.query(query4, [companyid, element.name, element.designation, element.tele, element.mobile, element.email])
            }

            for (let index = 0; index < furnace_capacity.length; index++) {
                const element = furnace_capacity[index];
                await db.query(query5, [companyid, element.metal, element.melting, element.heating])
            }

            for (let index = 0; index < machinery.length; index++) {
                const element = machinery[index];
                await db.query(query6, [companyid, element.type, element.capacity, element.value])
            }

            for (let index = 0; index < furnances.length; index++) {
                const element = furnances[index];
                await db.query(query7, [companyid, element.name,,element.capacity,element.batchespd,element.fuel])
            }

            for (let index = 0; index < metal_processing.length; index++) {
                const element = metal_processing[index];
                await db.query(query8, [companyid, element.metal, element.melting, element.heating, element.temp])
            }

            for (let index = 0; index < raw_materials.length; index++) {
                const element = raw_materials[index];
                await db.query(query9, [companyid, element.metal, element.origin, element.state, element.amount])
            }

            for (let index = 0; index < emp_details.length; index++) {
                const element = emp_details[index];
                await db.query(query10, [companyid, element.type, element.local, element.foreign])
            }

            for (let index = 0; index < products.length; index++) {
                const element = products[index];
                await db.query(query11, [companyid,element.metal,element.type, element.state, element.units, element.weight])
            }

            for (let index = 0; index < markets.length; index++) {
                const element = markets[index];
                await db.query(query12, [companyid, element.local_retail, element.local_companies, element.export])
            }

            for (let index = 0; index < other_markets.length; index++) {
                const element = other_markets[index];
                await db.query(query13, [companyid, element.name, element.percentage])
            }

            await db.query(query14, [companyid, "Y2016_2017", annual_turnover.y2016_2017])
            await db.query(query14, [companyid, "Y2017_2018", annual_turnover.y2017_2018])
            await db.query(query14, [companyid, "Y2018_2019", annual_turnover.y2017_2018])
            await db.query(query15, [companyid, business_progression.year1_dir, business_progression.year1, business_progression.year2_dir, business_progression.year2])

            for (let index = 0; index < waste_generated.length; index++) {
                const element = waste_generated[index];
                await db.query(query16, [companyid, element.type, element.amount, element.disposal])
            }

            for (let index = 0; index < enerygy_consumption.length; index++) {
                const element = enerygy_consumption[index];
                await db.query(query17, [companyid, element.type, element.state, element.units])
            }

            await db.query("COMMIT")
            res.send({ 'code': 200, 'message': 'Data Added Successfully' })

        } catch (error) {

            await db.query("ROLLBACK")

            console.log(error)
            res.send({ 'code': 204, 'message': 'Database Error Occured.Try Again' })

        } finally {
            await db.close()
            console.log('Executed')
        }
    }
}


