const router = require("express").Router()
const authorization = require("../middleware/authorization")

  router.post("/verify", authorization, async (req, res) => {
    console.log(typeof authorization)
    try {
      res.json(true)
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  })

module.exports = router