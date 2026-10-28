
const fs = require("node:fs");
const path = require("node:path");
const pool = require("../src/config/db");

async function main() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename VARCHAR(255) PRIMARY KEY,
        applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const directory = path.join(__dirname, "migrations");
    const files = fs.readdirSync(directory)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    for (const file of files) {
      const exists = await client.query(
        "SELECT 1 FROM schema_migrations WHERE filename = $1",
        [file]
      );

      if (exists.rowCount > 0) {
        console.log(`Đã chạy migration: ${file}`);
        continue;
      }

      const sql = fs.readFileSync(
        path.join(directory, file),
        "utf8"
      );

      await client.query(sql);
      await client.query(
        "INSERT INTO schema_migrations (filename) VALUES ($1)",
        [file]
      );

      console.log(`Đã chạy migration: ${file}`);
    }

    await client.query("COMMIT");
    console.log("Migration hoàn tất.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Migration thất bại:", error.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
