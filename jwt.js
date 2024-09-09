const jwt = require("jsonwebtoken");
const jwt_auth_middleware = (req, res, next) => {
  // Extract the jwt token from request header
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {
    // verify the jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user information to request object
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "invalid token" });
  }
};

// Function to generate jwt token
const generate_token = (userData) => {
  // generate new jwt Token using user Data
  return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = { jwt_auth_middleware, generate_token };
