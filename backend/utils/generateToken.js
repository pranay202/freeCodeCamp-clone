import jwt from "jsonwebtoken";

const generateToken = (id) => {
  const JWT_SECRET="Pranay1234"
  return jwt.sign({ id },JWT_SECRET, {
    expiresIn: "7d",
  });
};

export default generateToken;
