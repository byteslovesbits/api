const User = require("../database/models/userModel");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  // This middleware is passed to a express route as the second parameter. If a route sits behind authentication then
  // the only way for a user to access that routes callback logic is if they are authenticated. This prevents users accessing
  // information they shouldn't and is a nice elegant way to enforce a single responsibility principle. The only way the callback
  // within the route will run is if next() is called upon successful authentication of the user.
  try {
    // TODO REMOVE SECRET AND PUT IT SOMEWHERE SAFE WHERE IT IS NOT VISIBLE
    const jsonWebToken = req.header("Authorization").replace("Bearer ", "");
    const decodedJsonWebToken = jwt.verify(
      jsonWebToken,
      "bscomputersciencefinalyearproject"
    );

    // The jwt was given the user._id as the payload
    const user = await User.findOne({
      _id: decodedJsonWebToken._id,
      "jsonWebTokens.jwt": jsonWebToken,
    });

    if (!user) {
      throw new Error("Error: Please authenticate yourself with the system");
    }
    req.user = user;
    req.jwt = jsonWebToken;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ Error: "Please authenticate yourself with the system" });
  }
};

module.exports = authenticateUser;
