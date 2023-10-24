const { Product, Customer, Wishlist } = require("../models");

class wishlistController {
  static async addToWishlist(req, res, next) {
    try {
      const { id } = req.params;
      //const userId = 2;
      const { userId } = req.extraData; // nanti kalo udah ada authentication

      const check = await Product.findByPk(id);
      if (!check) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      const result = await Wishlist.create({
        ProductId: id,
        CustomerId: userId,
      });
      res.status(201).json({
        message: `Added to wishlist successfully`,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async fetchWishlist(req, res, next) {
    try {
      const { userId } = req.extraData;
      const checkUser = await Customer.findByPk(userId);

      if (!checkUser) {
        throw new Error("USER_NOT_FOUND");
      }

      const result = await Wishlist.findAll({
        where: {
          CustomerId: userId,
        },
        include: [
          {
            model: Product,
          },
        ],
      });
      //console.log(result, "Ini result");
      res.status(200).json({
        message: `Wishlist fetched`,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = wishlistController;
