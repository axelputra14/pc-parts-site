const { Product, Category, User, History } = require("../models");

class productController {
  static async readProduct(req, res, next) {
    try {
      const { count, rows } = await Product.findAndCountAll({
        include: [
          {
            model: User,
            attributes: ["email"],
          },
          {
            model: Category,
          },
        ],
      });

      res.status(200).json({
        message: "Success get product",
        data: rows,
        count: count,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addProduct(req, res, next) {
    try {
      const { name, description, price, stock, imgUrl, categoryId } = req.body;

      const { userId } = req.extraData;

      const result = await Product.create({
        name: name,
        description: description,
        price: price,
        stock: stock,
        imgUrl: imgUrl,
        status: "Active",
        categoryId: categoryId,
        authorId: userId,
      });
      await History.create({
        title: "POST",
        description: `New entity with id ${result.id} created`,
        updatedBy: userId,
      });
      res.status(201).json({
        message: "Product added successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  // static async productDetail(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const result = await Product.findByPk(id, {
  //       include: [
  //         {
  //           model: Category,
  //         },
  //       ],
  //     });

  //     if (!result) {
  //       throw new Error("PRODUCT_NOT_FOUND");
  //     }

  //     res.status(200).json({
  //       statusCode: 200,
  //       message: "Product found",

  //       data: {
  //         id: result.id,
  //         name: result.name,
  //         description: result.description,
  //         price: result.price,
  //         stock: result.stock,
  //         imgUrl: result.imgUrl,
  //         userEmail: result.User.email,
  //         userRole: result.User.role,
  //       },
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // static async deleteProduct(req, res, next) {
  //   try {

  //     const { id } = req.params;

  //     const searchResult = await Product.findByPk(id);

  //     if (!searchResult) {
  //       throw new Error("PRODUCT_NOT_FOUND");
  //     }

  //     const result = await Product.destroy({
  //       where: { id },
  //     });

  //     res.status(200).json({
  //       statusCode: 200,
  //       message: `${searchResult.name} successfully deleted`,
  //       data: result,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  static async updateProductStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const { userId } = req.extraData;
      const searchResult = await Product.findByPk(id);
      //console.log("Am I here");
      if (!searchResult) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      let result = await Product.update(
        { status: status },
        {
          where: {
            id: id,
          },
        }
      );
      await History.create({
        title: "PATCH",
        description: `Entity status with id ${id} has been updated from ${searchResult.status} to ${status}`,
        updatedBy: userId,
      });
      res.status(200).json({
        statusCode: 200,
        message: `Successfully updated`,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, stock, imgUrl, categoryId } = req.body;
      const { userId } = req.extraData;
      const searchResult = await Product.findByPk(id);
      //console.log("Am I here");
      if (!searchResult) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      let result = await Product.update(
        {
          name: name,
          description: description,
          price: price,
          stock: stock,
          imgUrl: imgUrl,
          categoryId: categoryId,
        },
        {
          where: {
            id: id,
          },
        }
      );
      await History.create({
        title: "PUT",
        description: `Entity with id ${id} updated`,
        updatedBy: userId,
      });
      res.status(200).json({
        statusCode: 200,
        message: `Successfully updated`,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = productController;
