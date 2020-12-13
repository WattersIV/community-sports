const bcrypt = require('bcrypt')
const router = require("express").Router();
module.exports = db => {
  router.post("/login", async (req, res) => {
    const { email, password } = req.body
    db.query(`
      SELECT *
      FROM users 
      WHERE email= $1 
      `
      , [email])
      .then(async ({ rows }) => {
        if (rows.length !== 0) {
          if (await bcrypt.compare(password, rows[0].password)) {
            req.session.user_id = rows[0].id
            res.send('Success')
          } else {
            res.send('Invalid email or password')
          }
        } else {
          return res.status(400).send('There is not a user with the provided email')
        }
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  })
  return router;
}

