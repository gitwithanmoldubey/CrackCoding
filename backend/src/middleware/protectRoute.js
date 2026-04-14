import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;

      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      // find user in db by clerk ID
      let user = await User.findOne({ clerkId });

      if (!user) {
        // Create a fallback user record when Clerk has authenticated but no DB record exists yet.
        user = await User.create({
          clerkId,
          name: "Clerk User",
          email: `user+${clerkId}@crackcoding.local`,
          profileImage: "",
        });
        console.warn(`Created fallback user for clerkId=${clerkId}`);
      }

      // attach user to req
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
