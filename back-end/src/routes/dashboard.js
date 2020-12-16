const router = require("express").Router()
const authorization = require("../middleware/authorization")
const db = require("../db")

  router.get("/dashboard", authorization, async (req, res) => {
    try {
      //Get currently logged in user
      const user = await db.query(`
      SELECT first_name, last_name, gender, age, phone, email, id   
      FROM users 
      WHERE id = $1`, 
      [req.user]
      )
      //Send back full user info
      res.json(user.rows[0])
    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server Error")
    }
  })

module.exports = router