const express = require("express");
const router = express.Router();
const {
  shortenURL,
  mapURL,
  homePage,
  getAllUrls,
  viewAllUrlsPage,
  viewAllUsersPage,
  getAllUsers,
} = require("../controllers/mainController.js");

router.route("/").get(homePage);
router.route("/view-all").get(viewAllUrlsPage);
router.route("/view-all-users").get(viewAllUsersPage);
router.route("/api/v1/shorten-url").post(shortenURL);
router.route("/api/v1/getAllUrls/:token").get(getAllUrls);
router.route("/api/v1/getAllUsers/:token").get(getAllUsers);

router.route("/:url").get(mapURL);

module.exports = router;
