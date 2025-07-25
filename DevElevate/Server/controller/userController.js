export const googleAuthCallback = (req, res) => {
  const token = req.user.token;

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // Set to true in production
  });

  res.redirect("http://localhost:5173/"); // or your frontend home
};

export const getMe = (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
