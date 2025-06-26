const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "MyJwTsEcReT";
module.exports = JWT_SECRET;