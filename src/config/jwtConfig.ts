import { verify } from "jsonwebtoken";
import process from "process";

export const verifyToken = async (token: string) => {
  try {
    if (token) {
      let authToken = token.replace("Bearer ", "");
      const decoded = await verify(authToken, process.env.JWT_SECRET_TOKEN);
      return decoded;
    }
  } catch (error) {
    return null;
  }
};
