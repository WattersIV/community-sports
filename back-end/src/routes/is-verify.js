const router = require("express").Router()
const authorization = require("../middleware/authorization")

module.exports = db => {
  router.get("/is-verify", authorization, async (req, res) => {
    try {
      res.json(true)
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  })
  return router
}