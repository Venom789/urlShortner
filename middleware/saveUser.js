const { users } = require("../model/schema");

module.exports = async (req, res) => {
  const find_user = await users.find({ token: req.oidc.user.sub });
  if (find_user.length) return;
  else {
    const saveUser = await users.create({
      email: req.oidc.user.email,
      token: req.oidc.user.sub,
    });
    return;
  }
};
