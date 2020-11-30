const cookieSession = require('cookie-session')
const router = require("express").Router(); 

module.exports = db => {
  router.post("/logout", (req, res) => {
    console.log('Im here')
    req.session = null 
    res.send("Logged Out")
  }) 
  return router
}