// create token and return as cookies

const sendToken = (user) => {
  try {
    const token = user.getJwtToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    };

    return { token, options };
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, error.statusCode || 500));
  }
};

module.exports = sendToken;
