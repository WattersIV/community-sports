const cookieSession = require('cookie-session')
const router = require("express").Router(); 

module.exports = db => {
  router.post("/logout", (req, res) => {
    req.session = null
    res.status(200).send()
  }) 
  console.log('III')
  return router
}