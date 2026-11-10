
const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Chua dang nhap"
    });
  }

  const token = authorization.slice(7);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: ["HS256"] }
    );

    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token khong hop le hoac da het han"
    });
  }
}

module.exports = { requireAuth };
