const express = require("express");
const router = express.Router();
const verifySeller = require("../middlewares/verifySeller");

router.post("/upload", verifySeller, async (req, res) => {
  try {
    // Product upload logic
    res.json({ message: "Product uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
