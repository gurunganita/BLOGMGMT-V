const userModel = require("./user.model");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");
const mailer = require("../../services/mailer");
const register = async (payload) => {
  payload.password = hashPassword(payload.password);
  const user = await userModel.create(payload);
  if (!user) throw new Error("Registration Failed");
  const result = await mailer(
    user.email,
    "User Signup",
    "User registered succesfully"
  );
  if (result) return "User registration Completed";
  return "User registration failed";
};
const login = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) throw new Error("Email or password missing");
  // check if user exist or not using email
  const user = await userModel
    .findOne({ email, isActive: true })
    .select("+password");
  console.log({ user });
  if (!user) throw new Error("User doesn't exist");
  // if user exist, get the hashpassword
  const { password: hashPw } = user;
  // compare the password
  const result = comparePassword(password, hashPw);
  // if password match, login into the system(access_token)
  if (!result) throw new Error("Email or password mismatch. Please try again.");
  // const signingData = { name: user.name, email: user.email, roles: user.roles };
  return result;

  //   access token return
  // const token = await signJWT(signingData);
  // return token;
};
const getById = (_id) => {};
const updateById = (_id, payload) => {};
const forgetPassword = (payload) => {};

const resetPassword = (userId, payload) => {};
const changePassword = (userId, payload) => {};
const getProfile = aync (_id)=>{
  return userModel.findOne{_id};
}
const updateProfile = async (_id, payload) => {
  delete payload.email;
  return userModel.findOne({ _id }, payload);
};

module.exports = {
  register,
  login,
  getById,
  updateById,
  forgetPassword,
  resetPassword,
  changePassword,
};
