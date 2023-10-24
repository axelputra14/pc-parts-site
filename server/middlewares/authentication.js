const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers; // dari success login
    if (!access_token) {
      throw new Error("Unauthorized");
    }
    const verified = verifyToken(access_token);
    const { id, email, role } = verified;
    req.extraData = {
      userId: id,
      email,
      role,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
