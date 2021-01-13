const Posts = require("./posts-model");
const express = require("express");

const router = express.Router();

router.post("", (req, res) => {
  // insert post
});

router.post("/:id/comments", (req, res) => {
  // post code
});

router.get("", (req, res) => {
  // insert get code
});

router.get("/:id/comments", (req, res) => {
  // get code
});

router.delete("/:id", (req, res) => {
  // delete code
});

router.put("/:id", (req, res) => {
  // put code
});

module.exports = router;
