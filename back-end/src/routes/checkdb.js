const { response } = require("express");
const db = require("../db")
const router = require("express").Router();

router.get("/checkdb/users", (request, response) => {
  db.query(
    `
      SELECT * FROM users;
      
    `
  ).then(({ rows: users }) => {
    response.json(users);
  });
});

router.get("/checkdb/events", (request, response) => {
  db.query(
    `
      SELECT * FROM events;
      
    `
  ).then(({ rows: events }) => {
    response.json(events);
  });
});

router.get("/checkdb/comments", (request, response) => {
  db.query(
    `
      SELECT * FROM comments;
      
    `
  ).then(({ rows: comments }) => {
    response.json(comments);
  });
})

module.exports = router