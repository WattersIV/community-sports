// const router = require("express").Router()
// const bcrypt = require("bcrypt")
// const jsonwebtoken = require("jsonwebtoken")
// const jwtGenerator = require("../utils/jwtGenerator")
// const validInfo = require('../middleware/validInfo');
// const db = require("../db")


//   router.post("/register", validInfo,  async (req, res) => {
//     try {
//       //Destructure Body
//       const { email, password } = req.body
//       //Check if email in use
//       const user = await db.query(`SELECT * FROM users WHERE email=$1`,
//         [email])

//       //If email is in use
//       if (user.rows.length !== 0) {
//         return res.status(401).send("Email already in use")
//       } else {
//         const hashedPassword = await bcrypt.hash(password, 10)
//         const userInfo = { ...req.body, password: hashedPassword }
//         //Put user into the db
//         const newUser = await db.query(`
//         INSERT INTO users (first_name, last_name, email, password, phone, age, gender) 
//         VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::integer, $7::text)
//         RETURNING id, first_name, last_name;
//         `
//           , [userInfo.first_name, userInfo.last_name, userInfo.email, userInfo.password, userInfo.phone, userInfo.age, userInfo.gender]
//         )

//         //create jwt
//         const token = jwtGenerator(newUser.rows[0].id)

//         res.json({ token })
//       }

//     } catch (err) {
//       console.error(err.message)
//       res.status(500).send("Server Error")
//     }
//   })

// module.exports = router

