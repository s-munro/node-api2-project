const Posts = require("../db-helpers");
const express = require("express");

const router = express.Router();

router.post("", (req, res) => {
  // insert post
});

router.post("/:id/comments", (req, res) => {
  // post code
});

router.get("", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then((postArray) => {
      const post = postArray[0];
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  Posts.findCommentById(id)
    .then((commentsArray) => {
      const comment = commentsArray[0];
      if (comment) {
        res.status(200).json(commentsArray);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  // delete code
});

router.put("/:id", (req, res) => {
  // put code
});

module.exports = router;
