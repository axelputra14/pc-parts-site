const { History } = require("../models");

class historyController {
  static async readHistory(req, res, next) {
    try {
      const historyList = await History.findAll({
        order: ["createdAt", "DESC"],
      });
      res.status(200).json({
        message: "Success get history",
        data: historyList,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = historyController;
