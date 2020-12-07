const router = require("express").Router();

module.exports = db => {
  router.get("/messages/:user_id", (req, res) => { 
     
    const userId = req.params.user_id;


    db.query(`
    SELECT m.*, u1.first_name as sender_first_name, u1.last_name as sender_last_name,
    u2.first_name as recipient_first_name, u2.last_name as recipient_last_name
    FROM messages AS m
    JOIN users AS u1 ON m.sender_id = u1.id
    JOIN users AS u2 ON m.recipient_id = u2.id
    JOIN message_user as mu ON m.id = mu.message_id
    WHERE mu.user_id = $1
    ORDER BY m.id ASC;
    `, 
    [userId]
  )
    .then((data) => {
   
      res.send(data.rows);
    }) 
  });

  router.post("/messages", (req, res) => { 
   
    const { senderId, recipientId, body } = req.body;
    
    return db.query(`
    INSERT INTO messages (sender_id, recipient_id, body)
    VALUES ($1, $2, $3)
    RETURNING id, sender_id, recipient_id;`, 
    [senderId, recipientId, body])
    .then(({rows}) => {
      console.log("after first query");
      console.log('rows',rows);
      const id = rows[0].id;
      const senderId = rows[0].sender_id;
      const recipientId = rows[0].recipient_id;
      return db.query(
        `
        INSERT INTO message_user (message_id, user_id)
        VALUES
        ($1, $2),
        ($1, $3)
        RETURNING message_id
        ;
        `,
      [id, senderId, recipientId])
    })
    .then(({rows}) => res.send(rows[0]))    
    .catch(err => console.log(err))
  })

  return router
}