var jwt = require("jsonwebtoken");
const JWT_SECRET = "Harryisagood$oy";

const fetchuser = (req, res, next) => {
  //Get the user from jwt token and add id to request
  const token = req.header("auth-token");
  console.log(token);
  if (!token) {
    res.status(401).send({ error: "Please autheticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please autheticate using a valid token" });
  }
};
module.exports = fetchuser;
