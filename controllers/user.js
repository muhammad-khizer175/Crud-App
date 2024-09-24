const User = require("../models/user");

let handleGetAllUsers = async (req, res) => {
  let allDbUsers = await User.find({});
  return res.json(allDbUsers);
};

let handleGetUserById = async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "user does not found" });
  }
  return res.json(user);
};

let handleUpdateUserById = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ msg: "you need to provide atleast one field" });
  }

  let user = await User.findById(req.params.id);

  if (user == undefined) {
    res.status(404).json({ msg: `user does not exist with id ` });
  } else {
    await User.findByIdAndUpdate(req.params.id, req.body);
    return res.json({ status: "success" });
  }
};

let handleDeleteUserById = async (req, res) => {
  let user = await User.findById(req.params.id);

  if (user == null) {
    res.status(404).json({ msg: `user does not exist with id ` });
  } else {
    await User.findByIdAndDelete(req.params.id);
    res.json({ status: "success" });
  }
};

let handleCreateNewUser = async (req, res) => {
  const body = req.body;
  if (
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are req..." });
  }

  await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  res.status(201).json({ status: "success" });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
