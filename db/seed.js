
const fs = require("node:fs");
const path = require("node:path");
const pool = require("../src/config/db");

async function main() {
  const client = await pool.connect();

  try {
    const directory = path.join(__dirname, "seeds");
    const files = fs.readdirSync(directory)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    for (const file of files) {
      const sql = fs.readFileSync(
        path.join(directory, file),
        "utf8"
      );

      await client.query(sql);
      console.log(`Đã chạy seed: ${file}`);
    }

    console.log("Seed hoàn tất.");
  } catch (error) {
    console.error("Seed thất bại:", error.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
