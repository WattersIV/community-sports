const cookieSession = require('cookie-session')
const router = require("express").Router(); 

  router.post("/logout", (req, res) => {
    req.session = null
    res.status(200).send()
  }) 

module.exports = router