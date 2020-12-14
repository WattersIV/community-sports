const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const router = require("express").Router();

module.exports = db => {
  router.post("/login", validInfo, async (req, res) => {
    try {
      //Destructure the body
      const { email, password } = req.body
      //Check id the user exists
      const user = await db.query(`
        SELECT *
        FROM users 
        WHERE email= $1 `
        , [email]
      )
      // If the user doesnt exist
      if (user.rows.length === 0) {
        return res.status(401).send('There is not a user with the provided email')
      }

      //Check if the password is correct 
      const validPassword = await bcrypt.compare(password, user.rows[0].password)

      if (!validPassword) {
        return res.status(401).send('Invalid email or password')
      }

      //Create jwt
      const token = jwtGenerator(user.rows[0].id)

      res.json({ token })

    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  })
  return router;
}

