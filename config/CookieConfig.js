exports.CookieConfig = () => {
  let secureSetting = true;
  if (process.env.NODE_ENV !== 'production') {
    secureSetting = false;
  }
  return {
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: secureSetting,
  };
};
