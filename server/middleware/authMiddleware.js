
import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

export const protectCompany = async (req, res, next) => {
  let token;

  // check if token exists in "Authorization" header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // get the token after "Bearer"

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const company = await Company.findById(decoded.id).select("-password");

      if (!company) {
        return res
          .status(404)
          .json({ success: false, message: "Company not found" });
      }

      req.company = company;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
};
