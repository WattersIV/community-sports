const router = require("express").Router();

// For the routes /events/...

module.exports = db => {
  
  // PUT: User to join event or update info (e.g change team and position) 

  router.post("/users/events/:event_id/create", (req, res) => {
    
    const eventId = req.params.event_id;

    // set an object named data from server
    const { id, teamNumber, position } = req.body;
    
    return db.query(
      `
      INSERT INTO teams (event_id, user_id, team_number, position)
      VALUES ($1, $2, $3, $4)
      RETURNING event_id;
    `,
     [eventId, id, Number(teamNumber), position])
    .then(({rows}) => {
      const eventId = rows[0].event_id;
      return db.query(`
        SELECT event_id, COUNT(*) as current_participants FROM teams 
        WHERE event_id = $1
        GROUP BY event_id;
      `,[eventId]) 
    })
    .then(({rows}) => {
      
      const { event_id, current_participants } = rows[0];
      db.query(`
        UPDATE events 
        SET current_participants = $1
        WHERE id = $2;
      `,
      [current_participants, event_id]);
    })
    .then(() => {
      res.send('okay');
    })
    .catch(error => {
      
      res.send(error);
    });
  });


    // PUT: user update settings
    router.put("/users/events/:event_id/edit", (req, res) => {
    
      const eventId = req.params.event_id;
      
      // set an object named data from server
      const { id, teamNumber, position } = req.body;
      
      db.query(
        `
        UPDATE teams SET team_number = $3, position = $4
        WHERE event_id = $1 AND user_id = $2;
      `,
       [eventId, id, Number(teamNumber), position])
       .then(() => res.send({status: "put okay"}))
       .catch(error => console.log(error));
    });


  // DELETE: User to leave event
  router.delete("/users/events/:event_id/delete", (req, res) => {
    const eventId = req.params.event_id;
    // need the user id from cookie
    const { id } = req.body;
    
    db.query(
      `
      DELETE FROM teams
      WHERE event_id = $1 AND user_id = $2
      `,
     [eventId, id])
     .then(() => {     
     return db.query(
       `
        SELECT event_id, COUNT(*) as current_participants FROM teams 
        WHERE event_id = $1
        GROUP BY event_id;
       `,[eventId]) })
      .then(({rows}) => {
        const { event_id, current_participants } = rows[0];
       
        db.query(`
          UPDATE events 
          SET current_participants = $1
          WHERE id = $2;
        `,
      [current_participants, event_id]);
      })
      .then(() => {
        res.send('delete okay');
      })
      .catch(error => {
       
        res.send(error);
      });
     
    });

  return router;
};