const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

class userController {
  static async postRegister(req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;
      if (!email || !password) {
        throw new Error("FIELD_EMPTY");
      }
      const check = await User.findOne({ where: { email } });
      if (check) {
        throw new Error("EMAIL_DUPLICATE");
      }

      const result = await User.create({
        email: email,
        password: password,
        role: "Admin",
        phoneNumber: phoneNumber,
        address: address,
      });

      res.status(201).json({
        message: "User registered successfully",
        data: { id: result.id, email: result.email },
      });
    } catch (err) {
      next(err);
    }
  }

  static async listUser(req, res, next) {
    try {
      const result = await User.findAll();

      if (!result) {
        throw new Error("DATA_NOT_FOUND");
      }

      res.status(200).json({
        message: "Success get user",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "LoginError" }; // error yang lempar object saja
      }

      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!foundUser) {
        throw new Error("USER_NOT_FOUND");
      }

      if (!compare(password, foundUser.password)) {
        throw new Error("INVALID_PASSWORD");
      }

      const payload = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      };

      const clientToken = createToken(payload);

      res.status(200).json({
        access_token: clientToken,
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const { token } = req.body;
      //console.log(token);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });
      //console.log(ticket);
      const payload = ticket.getPayload();
      //console.log(payload);
      const emailUser = payload.email;
      //console.log(emailUser, "INI EMAIL USER");

      const [user, created] = await User.findOrCreate({
        where: { email: emailUser },
        defaults: {
          password: "123456",
          role: "Staff",
          phoneNumber: "99999",
          address: "Pagedangan",
        },
      });
      //let status = "FOUND";
      let message = "Email has already been registered";

      if (created) {
        //status = "NOT_FOUND";
        message = "Success register using google";
      }

      res.status(200).json({
        message: message,
        data: { user },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;
