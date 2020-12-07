const router = require("express").Router();

// For the routes /events/...

module.exports = db => {
  
    // GET: All future events with the closest one on top
    router.get("/events", (req, res) => {
      const currentDate = new Date();

      db.query(
        `
        SELECT e.*, u.first_name, u.last_name FROM events AS e
        JOIN users AS u ON u.id = e.owner_id
        WHERE date >= $1
        ORDER BY date
        ;
        `,
      [currentDate]).then(({rows}) => res.json(rows))
    })

    // GET: All past events with the most recent one on top
    router.get("/events/past", (req, res) => {
      const currentDate = new Date();

      db.query(
        `
        SELECT e.*, u.first_name, u.last_name FROM events AS e
        JOIN users AS u ON u.id = e.owner_id
        WHERE date < $1
        ORDER BY date
        ;
        `,
      [currentDate]).then(({rows}) => res.json(rows))
    })

    // GET:  Event data based on event id
    router.get("/events/:event_id", (req, res) => {

      const eventId = req.params.event_id;

      db.query(
        `
        SELECT e.*, u.first_name, u.last_name FROM events AS e
        JOIN users AS u ON u.id = e.owner_id
        WHERE e.id = $1;
        `,
      [Number(eventId)])
      .then(({rows}) => res.json(rows))
      .catch(err => console.log(err));
    })

  // GET: team data for a specific :event_id
  router.get("/events/:event_id/teams", (req, res) => {

    const eventId = req.params.event_id;

    db.query(
      `
      SELECT t.*, u.first_name, u.last_name, u.gender FROM teams AS t
      JOIN users AS u ON t.user_id = u.id
      WHERE event_id = $1;
      `,
    [Number(eventId)])
    .then(({rows}) => res.json(rows))
    .catch(err => console.log(err));
  })

    // GET: comment data for a specific :event_id

  router.get("/events/:event_id/comments", (req, res) => {

    const eventId = req.params.event_id;

    db.query(
      `
      SELECT c.*, u.first_name, u.last_name FROM comments AS c
      JOIN users AS u ON c.user_id = u.id
      WHERE event_id = $1
      ORDER BY id DESC
      ;
      `,
    [Number(eventId)])
    .then(({rows}) => res.json(rows))
    .catch(err => console.log(err));
  })

  //Add a comment to an event page 
  router.post("/events/:event_id/comments", (req, res) => {
    const eventId = req.params.event_id
    const {userId, comment} = req.body
    db.query(` 
    INSERT INTO comments (user_id, event_id, comment) 
    VALUES ($1::integer, $2::integer, $3::text);`
    , [userId, eventId, comment]
  ) 
  .then(() => res.send('Comment Added'))
  })

  //GET all upcoming events for a specific user
  router.get("/events/users/:user_id", (req, res) => {

    const userId = req.params.user_id;
    const currentDate = new Date();

    db.query(`
      SELECT e.*, u.first_name, u.last_name FROM events AS e
      JOIN users AS u ON u.id = e.owner_id
      JOIN teams AS t ON e.id = t.event_id
      WHERE t.user_id = $1
      AND date >= $2
      ORDER BY date
      ;
    `,
    [userId, currentDate])
    .then(({rows}) => res.json(rows));
  })

  //GET all upcoming events for a specific user
  router.get("/events/users/:user_id/past", (req, res) => {

    const userId = req.params.user_id;
    const currentDate = new Date();
   
    db.query(`
      SELECT e.*, u.first_name, u.last_name FROM events AS e
      JOIN users AS u ON u.id = e.owner_id
      JOIN teams AS t ON e.id = t.event_id
      WHERE t.user_id = $1
      AND date < $2
      ORDER BY date
      ;
    `,
    [userId, currentDate])
    .then(({rows}) => res.json(rows));
  })

  return router;
};
