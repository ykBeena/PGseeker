const express = require("express");
const AppError = require("./../utils/appError");

const User = require("./../models/usermodel.js");
const Pg = require("../models/pgmodel");

const filterObj = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = async (req, res, next) => {
  try {
    if (req.body.password || req.body.passwordConfirm)
      return next(
        new AppError(
          "This route is not for updating password. Please use /updatePassword",
          400
        )
      );

    let updates = filterObj(req.body, [
      "name",
      "role",
      "about",
      "phone",
      "address",
    ]);
    updates.updated = Date.now();
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      runValidators: true,
      new: true,
    });

    if (!user) return next(new AppError("No document found with that id", 404));

    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    // const user = await User.findById(req.params.id);
    // if (!user) return next(new AppError("No document found with that id", 404));
    const pgs = await Pg.find({ pgOwner: req.params.id });
    req.pgs = pgs;
    next();
    // res.status(200).json({
    //   status: "success",
    //   data: {
    //     user,
    //     pgs,
    //   },
    // });
  } catch (err) {
    next(err);
  }
};

//  ADMIN USE -------------------------------------------------------------------------------------------------------------------------

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users: users,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    newUser.password = undefined;
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(new AppError("No document found with that id", 404));
    let response = {
      status: "success",
      data: { user },
    };
    if (req.pgs) {
      response.data.pgs = req.pgs;
    }
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.updateUserById = async (req, res, next) => {
  try {
    req.body.updated = Date.now();
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!user) return next(new AppError("No document found with that id", 404));

    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next(new AppError("No document found with that id", 404));

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};
