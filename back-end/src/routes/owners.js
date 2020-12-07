const router = require("express").Router();
const axios = require("axios")
require('dotenv').config()

module.exports = db => {
  router.post("/owners/events/new", (req, res) => {
    const {owner_id , date, start_time, end_time, title,
      address, city, province, max_participants, skill_level, 
      gender_restriction, referee, additional_info} = req.body  
    
    const current_participants = 1;

    let location
    //Formatting variables for api request
    const geocodeAddress = address.replace(/\s/g, '+')
    const geocodeCity = city.replace(/\s/g, '+')

      //Retriving lat and long from google api
      return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${geocodeAddress},+${geocodeCity},+CA&key=${process.env.geocodeKey}`)
      .then((res) => {
        const lat = res.data.results[0].geometry.location.lat
        const long = res.data.results[0].geometry.location.lng
        //Creating (x,y) format needed for psql point data type in psql
        location = `(${lat}, ${long})`
      })
      .then(() => {
        //Making a new event
        return db.query(` 
        INSERT INTO events (owner_id , date, start_time, end_time, title,
          address, city, province, current_participants, max_participants, skill_level, 
          gender_restriction, referee, additional_info, location) 
          VALUES ($1::integer, $2::date, $3::time, $4::time, $5::text, $6::text, 
          $7::text, $8::text, $9::integer, $10::integer, $11::text, $12::text, $13::boolean, $14::text, $15::point)
          RETURNING id, owner_id;`
          , [owner_id, date, start_time, end_time, title, address, city, province, current_participants,
          max_participants, skill_level, gender_restriction, referee, additional_info, location]
        ) 
      })
      .then(({rows}) => {
        //When it saved
        const eventId = rows[0].id;
        const ownerId = rows[0].owner_id;
        const {my_team, my_position} = req.body;

        db.query(`
        INSERT INTO teams (event_id, user_id, team_number, position) 
        VALUES
        ($1, $2, $3, $4);
        `,
        [eventId, ownerId, my_team, my_position]);
      })
      .then(() => {
        res.send('Event created and owner inserted into teams successfully');
      }
      )
      //When it fails
      .catch((err) => {
        console.log(err)
        res.send('Error')
      })
  })

  router.put("/owners/events/:id/edit", (req, res) => {
    const id = req.params.id;
    
    const { owner_id, date, start_time, end_time, title,
      address, city, province, max_participants, skill_level,
      gender_restriction, referee, additional_info } = req.body

    let location
    //Formatting variables for api request
    const geocodeAddress = address.replace(/\s/g, '+')
    const geocodeCity = city.replace(/\s/g, '+')

    //Retriving lat and long from google api
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${geocodeAddress},+${geocodeCity},+CA&key=${process.env.geocodeKey}`)
      .then((res) => {
       
        const lat = res.data.results[0].geometry.location.lat
        const long = res.data.results[0].geometry.location.lng
        //Creating (x,y) format needed for psql point data type in psql
        location = `(${lat}, ${long})`
      })
      .then(() => {
        //Making a new event
        return db.query(` 
          UPDATE events SET owner_id = $1, date = $2 , start_time = $3, end_time = $4, title = $5,
          address = $6, city = $7, province = $8, max_participants = $9, skill_level = $10, 
          gender_restriction = $11, referee = $12, additional_info = $13, location = $14
          
          WHERE id = $15
          `
          , [owner_id, date, start_time, end_time, title, address, city, province, 
            max_participants, skill_level, gender_restriction, referee, additional_info, location, id]
        )
      })
      .then(() => {
        //When it saved
        res.send('successfully edited');
      })
      //When it fails
      .catch((err) => {
      
        res.send('Error')
      })

  })

  router.delete("/owners/events/:id/delete", (req, res) => {
    const id = req.params.id;
    db.query(` 
    DELETE FROM events 
    WHERE id=$1`
      , [id]
    ).then(() => {
      //When it is Deleted
      res.send('Successfully Deleted')
    })
  })

  return router
}