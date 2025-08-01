// Middleware to restrict access to specific roles (e.g., "admin", "moderator")
const authorize = (...roles) => {
  // Returns a middleware function
  return (req, res, next) => {
    try {
      // Check if the user is authenticated (added by a previous middleware like authenticate)
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: No user info found" });
      }      // Check if the user's role is included in the allowed roles
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      // If authorized, move to the next middleware/handler
      next();
    } catch (error) {
      console.error("Error in authorize middleware:", error);
      return res
        .status(500)
        .json({ message: "Internal server errror while authorizing" });
    }
  };
};

export default authorize;
