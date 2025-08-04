// MIDDLEWARE TO RESTRICT ACCESS TO SPECIFIC ROLES (E.G., "ADMIN", "MODERATOR")
const authorize = (...roles) => {
  // RETURNS A MIDDLEWARE FUNCTION
  return (req, res, next) => {
    try {
      // CHECK IF THE USER IS AUTHENTICATED (ADDED BY A PREVIOUS MIDDLEWARE LIKE AUTHENTICATE)
      if (!req.user) {
        console.warn("Authorization failed: No user info found in request");
        return res
          .status(401)
          .json({ message: "Unauthorized: No user info found" });
      }

      // CHECK IF THE USER'S ROLE IS INCLUDED IN THE ALLOWED ROLES
      if (!roles.includes(req.user.role)) {
        console.warn(
          `Authorization failed: User role ${req.user.role} not permitted`
        );
        return res.status(403).json({ message: "Forbidden" });
      }
      console.log(`Authorization success: User role ${req.user.role} allowed`);

      // IF AUTHORIZED, MOVE TO THE NEXT MIDDLEWARE/HANDLER
      next();
    } catch (error) {
      console.error("Error in authorize middleware:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while authorizing" });
    }
  };
};

export default authorize;
