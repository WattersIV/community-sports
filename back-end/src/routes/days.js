// Leftover from scheduler.api; used for reference

const router = require("express").Router();

module.exports = db => {
  router.get("/days", (request, response) => {
    db.query(
      `
      SELECT * FROM users;
      `
    ).then(({ rows: days }) => {
      response.json(days);
    });
  });
  // router.get ("/test", (req, res) => {
  //   res.json('It works')
  // })

  return router;
};
