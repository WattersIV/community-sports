module.exports = (req, res, next) => {
  //Destructure body
  const { email, password, first_name, last_name, phone, age, gender } = req.body;

  //Checking if the email is valid
  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    //Checking if fields are empty
    if (![email, password, first_name, last_name, phone, age, gender].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password, first_name, last_name, phone, age, gender].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }

  next();
};