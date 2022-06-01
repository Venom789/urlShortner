const { saveURL, users } = require("../model/schema");
const { uid } = require("../helpers/uid");
const checkLogin = require("../middleware/checkLogin");
const saveUser = require("../middleware/saveUser");

const homePage = async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    if (req.oidc.user.email == process.env.ADMIN_EMAIL) {
      res.render("admin/index", {
        isLogin: req.oidc.isAuthenticated(),
        userData: req.oidc.user,
      });
    } else {
      saveUser(req, res);
      res.render("index", {
        isLogin: req.oidc.isAuthenticated(),
        userData: req.oidc.user,
      });
    }
  } else {
    res.render("index", { isLogin: false, userData: {} });
  }
};

const shortenURL = async (req, res) => {
  try {
    if (checkLogin(req, res)) {
      const url = req.body.url.toLowerCase();
      if (url) {
        const shorten_url = process.env.BASE_URL + uid();
        const newUrl = await saveURL.create({
          email: req.oidc.user.email,
          token: req.oidc.user.sub,
          url: url,
          shortenUrl: shorten_url,
        });
        const dup_res = newUrl;
        const response = {
          _id: dup_res._id,
          url: dup_res.url,
          shortenUrl: dup_res.shortenUrl,
          clicks: dup_res.clicks,
        };
        res.json(response);
      } else {
        res.json({ error: "url is required" });
      }
    } else {
      res.status(401).json({ error: "unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const mapURL = async (req, res, next) => {
  try {
    const shortenUrl =
      process.env.BASE_URL + req.params.url.toLowerCase();
    const getSavedUrl = await saveURL.findOneAndUpdate(
      { shortenUrl: shortenUrl },
      { $inc: { clicks: 1 } }
    );
    if (getSavedUrl) {
      res.redirect(getSavedUrl.url);
    } else next();
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllUrls = async (req, res) => {
  const token = req.params.token;
  const count = req.query.count;

  if (token) {
    const allUrl = await saveURL.find(
      { token: token },
      { _id: 0, clicks: 1, url: 2, shortenUrl: 3 }
    );
    if (count > 0) {
      res.json(allUrl.reverse().slice(0, count));
    } else res.json(allUrl);
  } else {
    res.json({ status: "400", request: "invalid" });
  }
};
const getAllUsers = async (req, res) => {
  const token = req.params.token;
  const count = req.query.count;

  if (token == process.env.ADMIN_TOKEN) {
    const allUsers = await users.find();
    if (count > 0) {
      res.json(allUsers.reverse().slice(0, count));
    } else res.json(allUsers);
  } else {
    res.json({ status: "400", request: "invalid token" });
  }
};

const viewAllUrlsPage = (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.render("all-urls", {
      userData: req.oidc.user,
    });
  } else {
    res.redirect("./login");
  }
};

const viewAllUsersPage = (req, res) => {
  if (req.oidc.isAuthenticated()) {
    if (req.oidc.user.email == process.env.ADMIN_EMAIL) {
      res.render("admin/viewAllUsersPage", {
        isLogin: req.oidc.isAuthenticated(),
        userData: req.oidc.user,
      });
    }
  } else {
    res.redirect("/login");
  }
};

const singleUserPage = (req, res) => {
  if (req.oidc.user.email == process.env.ADMIN_EMAIL) {
    res.render("admin/singleUser", {
      userData: req.oidc.user,
    });
  } else {
    res.redirect("./login");
  }
};

const delUser = (req,res)=>{
  if(req.oidc.user.sub == process.env.ADMIN_TOKEN){
      const token = req.params.token;
      saveURL.remove({ token:token}, function(err) {
        if (!err) {
          users.remove({token:token},function(err){
            if(!err)
            res.status(200).json('deleted');
            else
            res.status(400).json('some Error');
          });
        }
        else res.status(400).json('some Error');
      });
      }
  else{
    res.status(200).json({'msg':'unauthorized'});
  }
}

module.exports = {
  mapURL,
  shortenURL,
  homePage,
  getAllUrls,
  getAllUsers,
  viewAllUrlsPage,
  viewAllUsersPage,
  singleUserPage,
  delUser,
};
