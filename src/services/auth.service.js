
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const repository = require("../repositories/auth.repository");

async function login(username, password) {
  if (
    typeof username !== "string" ||
    !username.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    const error = new Error("Vui long nhap tai khoan va mat khau");
    error.status = 400;
    throw error;
  }

  const user = await repository.findUserByUsername(username.trim());

  const validPassword = user
    ? await bcrypt.compare(password, user.password_hash)
    : false;

  if (!validPassword) {
    const error = new Error("Tai khoan hoac mat khau khong dung");
    error.status = 401;
    throw error;
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET chua duoc cau hinh");
  }

  const token = jwt.sign(
    {
      userId: user.user_id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h", algorithm: "HS256" }
  );

  return {
    token,
    user: {
      user_id: user.user_id,
      username: user.username,
      role: user.role
    }
  };
}

module.exports = { login };
