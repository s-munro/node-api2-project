const Posts = require("../db-helpers");
const express = require("express");

const router = express.Router();

router.post("", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    Posts.insert(req.body)
      .then((postId) => {
        res.status(201).json(postId);
      })
      .catch((err) => {
        res.status(500).json({
          error: "There was an error while saving the post to the database",
        });
      });
  }

  // insert post
});

router.post("/:id/comments", (req, res) => {
  const { text } = req.body;

  if (!text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    Posts.insertComment(req.body)
      .then((commentId) => {
        res.status(201).json(commentId);
        // returnComment(commentId);
      })
      .catch((err) => {
        res.status(500).json({
          error: "There was an error while saving the comment to the database",
        });
      });
  }
  const returnComment = (commentId) => {
    Posts.findCommentById(commentId)
      .then((comment) => {
        res.status(201).json(comment);
      })
      .catch((err) => {
        res
          .status(404)
          .json({ error: "can not find the newly added comment by ID" });
      });
  };
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
  const { id } = req.params;
  Posts.remove(id)
    .then((post) => {
      res.status(204).json({ message: "post deleted" });
    })
    .catch((err) => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({ message: "please provide title and contents" });
  } else {
    Posts.update(id, req.body)
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "The post information could not be updated" });
      });
  }
  // put code
});

module.exports = router;
