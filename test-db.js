
const pool = require("./src/config/db");

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");
    console.log("Ket noi PostgreSQL thanh cong!");
    console.log("Thoi gian database:", result.rows[0].current_time);
  } catch (error) {
    console.error("Loi ket noi:", error.message);
  } finally {
    await pool.end();
  }
}

testConnection();
