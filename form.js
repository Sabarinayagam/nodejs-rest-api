const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const { JWT_SECRET } = require("../config");
const router = express.Router();


function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// /form/save-details route
router.post("/form/save-details", authenticateToken, async (req, res) => {
  const {
    firstname,
    lastname,
    middlename,
    address,
    email,
    phoneNumber,
    height,
    weight,
  } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO form_details (firstname, lastname, middlename, address, email, phone_number, height, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        firstname,
        lastname,
        middlename,
        address,
        email,
        phoneNumber,
        height,
        weight,
      ]
    );
    res.json({
      message: "Form details saved successfully",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// /form/delete-details/:id route
router.delete(
  "/form/delete-details/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const [result] = await pool.query(
        "DELETE FROM form_details WHERE id = ?",
        [req.params.id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Form details not found" });
      }
      res.json({ message: "Form details deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

module.exports = router;
