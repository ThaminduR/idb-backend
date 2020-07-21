const database = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');


//function to fill company data

exports.getCompanyData = async function (req, res) {
    db=new database()

    query1 = "SELECT name FROM company WHERE name=?"
    query= "CALL AddSurvey(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    
    try{
        companyName = req.body.companyName
        console.log(companyName)
        name=await db.query(query1,[companyName])
        
    }catch(error){
        console.log("error")
    }
    if(name!=""){
        console.log("Company already exists in database")
    }
    else{
        companyName = req.body.companyName,
        province=req.body.province,
        district=req.body.district,
        dsDivision=req.body.dsDivision,
        gnDivision=req.body.gnDivision,
        latitiude=req.body.latitude,
        longitude=req.body.longitude,
        address=req.body.address,
        email=req.body.email,
        telenumber=req.body.telenumber,
        fax=req.body.fax,
        website=req.body.website,
        proprietor=req.body.proprietor,
        turnover=req.body.turnover,
        employees=req.body.employees,
        yoe=req.body.yoe,
        business_type=req.body.business_type,
        reg_no=req.body.reg_no,
        industry_reg=req.body.industry_reg,
        industry_reg_no=req.body.industry_reg_no
        land_area=req.body.land_area,
    	land_value=req.body.land_value,
    	building_area=req.body.building_area,
    	building_value=req.body.building_value,
    	machine_value=req.body.machine_value,
    	utilities_value=req.body.utilities_value,
        total_capital_investment=req.body.total_capital_investment,
        raw_mat_value=req.body.raw_mat_value,
        semi_goods_value=req.body.semi_goods_value,
        goods_value=req.body.goods_value,
        total_working_capital=req.body.total_capital_investment,
        site_type=req.body.site_type,
        furnace_capacity=req.body.furnace_capacity,
        furnances=req.body.furnances,
        machinery=req.body.machinery,
        metal_processing=req.body.metal_processing,
        raw_materials=req.body.raw_materials,
        emp_details=req.body.emp_details,
        products=req.body.products,
        markets=req.body.markets,
        other_markets=req.body.other_markets,
        annual_turnover=req.body.annual_turnover,
        business_progression=req.body.business_progression,
        waste_generated=req.body.waste_generated,
        interviewer=req.body.interviewer,
        yoi=req.body.yoi
        // DELIMITER //
        // CREATE PROCEDURE AddSurvey
        //        (company_id varchar(11),
                // companyName varchar(40),
                // province varchar(20),
                // district varchar(20),
                // dsDivision varchar(20),
                // gnDivision varchar(20),
                // latitiude float,
                // longitude float,
                // address varchar(40), 
                // telenumber varchar(10),
                //  email varchar(20),
                // fax varchar(10),
                // website varchar(20),
                // turnover varchar(10),
                // employees varchar(10),
                // yoe year,
                // business_type varchar(20),
                // reg_no varchar(10),
                // industry_reg BOOLEAN,
                // industry_reg_no varchar(10),
                // land_area float,
                // land_value float,
                // building_area float,
                // building_value float,
                // machine_value float,
                // utilities_value float,
                // total_capital_investment float,
                // raw_mat_value float,
                // semi_goods_value float,
                // goods_value float,
                // total_working_capital float,
                // site_type varchar(10),
                // interviewer varchar(20),
                // yoi year  
            
           
        // )
        
        // BEGIN
        
        
        // INSERT INTO company (name,address,year_established,surveyed_year) VALUES (name,address,yoe,yoi);
        
        // SET company_id= (SELECT id FROM company WHERE 'name'=companyName);
        
        // INSERT INTO location (id,province,district,ds_division,gn_division,latitude,longitude) VALUES (company_id,province,district,ds_division,gn_division,latitude,longititude);
        
        // INSERT INTO contact_details (id,telephone,email,fax,website) VALUES (company_id,telenumber,email,fax,website);
        
        // INSERT INTO company_category (id,employee_category,turnover_category) VALUES (company_id,employees,turnover);
        
        // INSERT INTO company_category (id,employee_category,turnover_category) VALUES (company_id,employees,turnover);
        
        // INSERT INTO ownership_registration (id,type,reg_no,industry_reg,industry_reg_no) VALUES (company_id,business_type,reg_no,industry_reg,industry_reg_no);
        
        // INSERT INTO land_capital (id,land_area,land_value) VALUES (company_id,land_area,land_value);
        
        // INSERT INTO building_capital (id,bulding_area,buldingd_value) VALUES (company_id,bulding_area,bulding_value);
        
        // INSERT INTO capital_investment (id,plant_machinery,utilities,total) VALUES (company_id,machine_value,utilities_value,total_capital_investment);
        
        // INSERT INTO working_captial (id,raw_material,semi_finished,finished) VALUES (company_id,raw_mat_value,semi_goods_value,goods_value);
        
        // INSERT INTO property_ownership (id,ownership) VALUES (company_id,site_type);
        
        // END;
        
        // //
        
        // DELIMITER ;
        
        
        
        

   
    
    
    try {
        result = await db.query(query, [companyName,province,district,dsDivision,gnDivision,
            latitiude,
            longitude ,
            address, 
            telenumber,
            email,
            fax ,
            website,
            turnover,
            employees ,
            yoe,
            business_type,
            reg_no,
            industry_reg,
            industry_reg_no ,
            land_area,
            land_value,
            building_area,
            building_value,
            machine_value,
            utilities_value,
            total_capital_investment,
            raw_mat_value,
            semi_goods_value,
            goods_value,
            total_working_capital,
            site_type ,
            interviewer,
            yoi])

    } catch (error) {
        console.log(error)
    }
}
}


