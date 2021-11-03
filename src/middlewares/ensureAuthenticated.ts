import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Ipayload {
  sub: string;
}

export function ensureAutenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ message: "Token missing" });
  }
  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(
      token,
      "15ea78b53370b68dc5013b5e2ef026bd"
    ) as Ipayload;

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
