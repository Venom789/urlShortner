const express = require("express");
const router = express.Router();
const {
  shortenURL,
  mapURL,
  homePage,
  singleUserPage,
  getAllUrls,
  viewAllUrlsPage,
  viewAllUsersPage,
  getAllUsers,
  delUser,
} = require("../controllers/mainController.js");

router.route("/").get(homePage);
router.route("/view-single-user/:id").get(singleUserPage);
router.route("/view-all").get(viewAllUrlsPage);
router.route("/view-all-users").get(viewAllUsersPage);
router.route("/api/v1/shorten-url").post(shortenURL);
router.route("/api/v1/getAllUrls/:token").get(getAllUrls);
router.route("/api/v1/getAllUsers/:token").get(getAllUsers);
router.route("/api/v1/delUser/:token").get(delUser);

router.route("/:url").get(mapURL);

module.exports = router;
