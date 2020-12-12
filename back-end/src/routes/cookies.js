const router = require("express").Router();


module.exports = db => {
  router.get("/cookies", (req, res) => {
    console.log('Im in da cookies', req.session.user_id)
    db.query(`
    SELECT id, first_name, last_name 
    FROM users 
    WHERE id = $1`
      , [req.session.user_id]
    )
      .then(({ rows }) => {
        res.send(rows[0])
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  })
  return router
}