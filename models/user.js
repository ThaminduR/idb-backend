const database = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

exports.test = function (req, res) {
    console.log('Route Response')
    res.send({
        'code': 200,
        'message': "Success"
    })
}




//function to print company data

exports.getCompanyData = async function (req, res) {
    query = "SELECT id FROM company WHERE name=?"
    name = req.body.company_name
    try {
        result = await db.query(query, [name])
        res.render('company/info.jsx', {
            title: "Company Details",
            user: result
        })
    } catch (error) {
        console.log(error)
    }
}


// //to save emergency details
// exports.saveEmDet = async function (req, res) {
//     fullname = req.body.fullname
//     contactnum = req.body.contactnum
//     id = req.user.user_id

//     query = "INSERT INTO emergency_details VALUES (?,?,?)"

//     try {
//         await db.query(query, [id, fullname, contactnum])
//         res.redirect('/')
//     } catch (error) {
//         console.log(error)
//     }
// }

// //request a leave
// exports.reqLeave = async function (req, res) {
//     type = req.body.leavetype
//     detail = req.body.detail
//     date = req.body.leavedate
//     id = req.user.user_id
//     leave_id = "LEV00001"

//     query1 = 'SELECT leave_id FROM leaves ORDER BY leave_id DESC LIMIT 1'

//     try {
//         result = await db.query(query1)
        
//         if (result.length > 0) {
//             str = result[0].leave_id;
//             temp_str = str.slice(3);
//             n = parseInt(temp_str) + 1;
//             length = n.toString().length;
//             temp_id = str.slice(0, -length);
//             leave_id = temp_id + n.toString();
//         }
//     } catch (error) {
//         console.log(error)
//     }



//     query = "CALL request_leave(?,?,?,?,?)"

//     try {
        
//             await db.query(query, [id, leave_id, type, detail, date])
//             res.redirect('/')

        


//     } catch (error) {
//         console.log(error)
//     }
// }




// exports.saveDepInfo = async function (req, res) {
//     fullname = req.body.fullname
//     birthday = req.body.birthday
//     relationship = req.body.relationship
//     contactnum = req.body.contactnum
//     id = req.user.user_id

//     query = "INSERT INTO dependent_info VALUES (?,?,?,?,?)"

//     try {
//         await db.query(query, [id, fullname, birthday, relationship, contactnum])
//         res.redirect('/')
//     } catch (error) {
//         console.log(error)
//     }
// }

// exports.addDet = async function (req, res) {
//     query = "SELECT * FROM additional_details"
//     try {
//         results = await db.query(query)
//         res.render('employee/additional.ejs', { title: "Add Additional Information", results: results })
//     } catch (error) {

//     }
// }

// exports.adddetdb = async function (req, res) {
//     const id = req.user.user_id
//     for (var key in req.body) {
//         const value = req.body[key]
//         const query1 = "SELECT * FROM add_det_emp WHERE add_id = ? AND e_id = ?"
//         try {
//             const results = await db.query(query1, [key, id])
//             if (results.length > 0) {
//                 const query = "UPDATE add_det_emp SET value = ? WHERE add_id =? AND e_id =?"
//                 await db.query(query, [value, key, id])
//                 res.redirect('/')
//             } else {
//                 const query = "INSERT INTO add_det_emp VALUES(?,?,?)"
//                 try {
//                     await db.query(query, [key, id, value])
//                     res.redirect('/')
//                 } catch (error) {
//                     console.log(error)
//                 }
//             }
//         } catch (error) {
//             console.log(error)
//         }


//     }
// }

// exports.checkLeave = async function (req, res) {
//     const id = req.user.user_id
//     query = "SELECT count_leaves(?,?) AS count_leaves"
//     query1 = "SELECT leave_id,leavetype,date,description FROM leaves INNER JOIN taken ON leaves.leave_id=taken.l_id WHERE e_id=?"
//     query2 = "SELECT leave_id,leavetype,date,description FROM leaves INNER JOIN deleted ON leaves.leave_id=deleted.l_id WHERE e_id=?"
//     query3="SELECT leave_id,leavetype,date,description FROM leaves INNER JOIN requested ON leaves.leave_id=requested.l_id WHERE e_id=?"
//     try {
//         result1 = await db.query(query, [id, "Annual"])
//         result2 = await db.query(query, [id, "Casual"])
//         result3 = await db.query(query, [id, "Maternity"])
//         result4 = await db.query(query, [id, "No Pay"])
//         result5 = await db.query(query1, [id])
//         result6 = await db.query(query2, [id])
//         result7= await db.query(query3, [id])

//         result = [result1, result2, result3, result4, result5, result6,result7]
        

//         res.render('employee/checkleave.ejs', {
//             title: "Remaining Leaves",
//             result: result
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }