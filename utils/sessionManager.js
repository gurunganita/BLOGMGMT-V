const { verifyJWT } = require("./token");
const checkRole = (sysRole) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.access_token || "";
      if (!token) throw new Error("Access token is required");
      const data = verifyJWT(token);
      if (!data) throw new Error("Permission Denied");
      // check role
      const { data: user } = data;
      const { email } = user;
      const userData = await userModel.findOne({ email, isActive: true });
      if (!user) throw new Error("User not found");
      console.log(userData, sysRole);
      const isValidRole = sysRole.some((role) => userData.roles.includes(role));
      // console.log({ isValidRole });
      if (!isValidRole) throw new Error("Permission Denied");
      next();
    } catch (e) {
      next(e);
    }
  };
};
module.exports = { checkRole };
