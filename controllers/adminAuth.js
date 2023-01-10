const Admin = require("../modles/Admin");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// const register = async (req, res) => {
//   const admin = await Admin.create({ ...req.body });
//   res.status(201).json({ admin });
// };

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new UnauthenticatedError("Wrong email");
  }
  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError("Wrong Password");
  }
  const token = admin.createJWT();
  res.status(200).json({ admin: { name: admin.name }, token });
};

module.exports = { login };
