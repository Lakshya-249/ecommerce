import { NextFunction, Request, Response } from "express";
import { User } from "../Models/schemas";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "./jwtToken";

interface IUser {
  _id: Object;
  email: string;
  username: string;
  password: string;
  name: string;
  addresses: Object;
  accounts: Object;
}

export interface CustomRequest extends Request {
  user?: IUser;
}

const handleRequest = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ error: "User need to log in to access this page." });
      return;
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = verifyToken(token);
    if (decodedToken == null || !decodedToken) {
      res.status(401).json({ message: "Invalid Token" });
      return;
    }
    const user = await User.findById((decodedToken as JwtPayload).id);
    if (!user) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    req.user = user;
    // console.log(req.user);

    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export { handleRequest };
