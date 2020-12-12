const router = require("express").Router()
const bcrypt = require("bcrypt")


module.exports = db => {
  router.post("/register", (req, res) => {
    const {email, password} = req.body
    db.query(`SELECT * FROM users WHERE email=$1`, 
    [email]) 
    .then( async (user) => {
      console.log('here!')
      //If user exists stop and send email already exists
      if (user.rows[0]) {
        res.send('Email already in use')
        //if user email does not exist add to DB
      } else {
        const hashedPassword = await bcrypt.hash(password, 10)
        const userInfo = {...req.body, password: hashedPassword}
        console.log(userInfo)
        db.query(`
          INSERT INTO users (first_name, last_name, email, password, phone, age, gender) 
          VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::integer, $7::text)
          RETURNING id, first_name, last_name;
          `
          , [userInfo.first_name, userInfo.last_name, userInfo.email, userInfo.password, userInfo.phone, userInfo.age, userInfo.gender ]
        ) .then(({rows}) => { 
            const id = rows[0].id
            req.session.user_id = id //saves user as as cookie
            //returning the whole user object 
            res.send(rows[0]) 
         }) 
          .catch((err) => {
            res.status(500).send(err)
          })
        }
      })  
    })
  return router;
}