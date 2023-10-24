const { Category } = require("../models");

class categoryController {
  static async readCategory(req, res, next) {
    try {
      const { count, rows } = await Category.findAndCountAll();
      // console.log(count);
      // console.log(rows);

      res.status(200).json({
        message: "Success get category",
        data: rows,
        count: count,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;

      const result = await Category.create({
        name: name,
      });

      res.status(201).json({
        message: "Category added successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  // static async deleteCategory(req, res, next) {
  //   try {
  //     const { id } = req.params;

  //     const searchResult = await Category.findByPk(id);

  //     if (!searchResult) {
  //       throw new Error("CATEGORY_NOT_FOUND");
  //     }

  //     const result = await Category.destroy({
  //       where: { id },
  //     });

  //     // console.log(searchResult, "INI SEARCH RESULT");
  //     // console.log(result, "INI RESULT");

  //     res.status(200).json({
  //       statusCode: 200,
  //       message: `${searchResult.name} successfully deleted`,
  //       data: result,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}

module.exports = categoryController;
