const router = require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

module.exports = db => {
  router.get("/dashboard", authorization, async (req, res) => {
    try {
      //Get currently logged in user
      const user = await db.query(`
      SELECT first_name, last_name, gender, age, phone, email   
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
  return router
}