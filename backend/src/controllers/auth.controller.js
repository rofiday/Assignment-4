const { User, Role } = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  register: async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      await User.create({
        id: uuidv4(),
        ...req.body,
      });
      res.status(201).json({
        status: "success",
        message: "User created successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  login: async (req, res) => {
    console.log("body : ", req.body);
    try {
      const user = await User.findOne({
        where: { email: req.body.email },
        include: [
          {
            model: Role,
            as: "roles",
            attributes: ["roleName"],
          },
        ],
      });
      console.log(user);
      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "User not found",
        });
      }
      const isMatch = (req.body.password = await bcrypt.compare(
        req.body.password,
        user.password
      ));
      if (!isMatch) {
        return res.status(400).json({
          status: "error",
          message: "Invalid password",
        });
      }
      /**setelah register password dibcrypt dan login passsword user telah di compare
       * kita setup token untuk menyimpan data user tanpa menyimpan password
       * dan setelah login kita dapat langsung mengambil data user dari token
       */
      const token = jwt.sign(
        {
          /**setup token yang untuk menyimpan data login user */
          id: user.id,
          username: user.username,
          email: user.email,
          roleName: user.roles[0].roleName,
        },
        process.env.JWT_SECRET
      );
      /**lalu setelah menyimpan data token, data token tersebut kita simpan di cookie
       * supaya user dapat mengakses data user tanpa harus melakukan login lagi
       */
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        status: "success",
        message: "User logged in successfully",
        data: token,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  logout: async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  },
};
