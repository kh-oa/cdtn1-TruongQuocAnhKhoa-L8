
const pool = require("../config/db");

async function findUserByUsername(username) {
  const result = await pool.query(
    `SELECT user_id, username, password_hash, role
     FROM users
     WHERE username = $1`,
    [username]
  );

  return result.rows[0] || null;
}

module.exports = { findUserByUsername };
