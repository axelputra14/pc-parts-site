const { Product, Category } = require("../models");
const { Op } = require("sequelize");
const axios = require("axios");

class customerProductController {
  static async fetchProduct(req, res, next) {
    try {
      const { page, nameSearchQuery } = req.query;
      let pageAmount = 0;
      let query = {};

      query.status = "Active";

      let startPoint = 0;
      const pageSize = 8;

      if (page) {
        startPoint = pageSize * (page - 1);
      }
      let nameSearch = "";
      if (nameSearchQuery) {
        nameSearch = nameSearchQuery;
      }

      const { count, rows } = await Product.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${nameSearch}%`,
          },
        },
        limit: pageSize,
        offset: startPoint,
        include: [
          {
            model: Category,
          },
        ],
        order: [["createdAt", "ASC"]],
      });

      pageAmount = Math.ceil(count / pageSize);

      res.status(200).json({
        message: "Success get product",
        data: rows,
        count: count,
        pageAmount: pageAmount,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getProductDetail(req, res, next) {
    try {
      const qr_url = "https://branded-items-c3.web.app/product/";
      const { id } = req.params;

      const checkProduct = await Product.findOne({
        where: { id },
        include: [
          {
            model: Category,
          },
        ],
      });

      if (!checkProduct) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      // bagian QR code

      const { data } = await axios({
        url: "https://api.qr-code-generator.com/v1/create",
        method: "GET",

        params: {
          "access-token": process.env.QR_KEY,
          qr_code_text: qr_url + id,
          image_format: "PNG",
          image_width: 500,
          download: 1,
        },
        responseType: "arraybuffer",
      });
      // console.log(data);
      const base64 = btoa(
        new Uint8Array(data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      let Qr_code = `data:;base64,${base64}`;

      res.status(200).json({
        message: "Success get product",
        data: checkProduct,
        qr: Qr_code,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = customerProductController;
