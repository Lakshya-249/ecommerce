import jwt, { JwtPayload } from "jsonwebtoken";
import { loadEnvFile } from "process";
loadEnvFile();

const secretKey = process.env.SECRET_KEY;

const generateToken = (payload: Object): string => {
  const token = jwt.sign(payload, secretKey as string, { expiresIn: "1w" });

  return token;
};

const verifyToken = (token: string) => {
  if (!token) return null;

  if (isTokenExpired(token)) return null;

  try {
    const decoded = jwt.verify(token, secretKey as string);
    return decoded;
  } catch (error) {
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  const decodedToken = jwt.decode(token) as JwtPayload;
  if (!decodedToken || !decodedToken.exp) {
    return true;
  }
  const dateNow = new Date();
  const currentTime = Math.floor(dateNow.getTime() / 1000);
  return decodedToken.exp < currentTime;
};

export { generateToken, verifyToken };
