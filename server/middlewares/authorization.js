const { Product, User } = require("../models/");

const authorizationProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { userId, role } = req.extraData;
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("DATA_NOT_FOUND");
    }

    const product = await Product.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new Error("DATA_NOT_FOUND");
    }
    //console.log(userId, "==", product.authorId);
    if (role !== "Admin") {
      if (userId !== product.authorId) {
        throw new Error("Forbidden");
      }
      //console.log("am I here");
    }

    next();
  } catch (err) {
    next(err);
  }
};

const statusUpdateAuth = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.extraData;
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("DATA_NOT_FOUND");
    }

    if (role != "Admin") {
      throw new Error("Forbidden");
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authorizationProduct,

  statusUpdateAuth,
};
