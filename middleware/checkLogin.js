module.exports = function (req, res) {
    if (req.oidc.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  };
  