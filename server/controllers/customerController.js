const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Customer } = require("../models");

class customerController {
  static async postRegister(req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;
      if (!email || !password) {
        throw new Error("FIELD_EMPTY");
      }
      const check = await Customer.findOne({ where: { email } });
      if (check) {
        throw new Error("EMAIL_DUPLICATE");
      }

      const result = await Customer.create({
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
      });

      res.status(201).json({
        message: "Customer registered successfully",
        data: { id: result.id, email: result.email },
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginCustomer(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "LoginError" }; // error yang lempar object saja
      }

      const foundCustomer = await Customer.findOne({
        where: {
          email,
        },
      });

      if (!foundCustomer) {
        throw new Error("USER_NOT_FOUND");
      }

      if (!compare(password, foundCustomer.password)) {
        throw new Error("INVALID_PASSWORD");
      }

      const payload = {
        id: foundCustomer.id,
        email: foundCustomer.email,
        role: foundCustomer.role,
      };

      const clientToken = createToken(payload);

      res.status(200).json({
        access_token: clientToken,
        id: foundCustomer.id,
        email: foundCustomer.email,
        role: foundCustomer.role,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = customerController;
