module.exports = {
  validateUsers(req, res, next) {
    if (req.method === "POST") {
      req.checkBody("username",
      'must be at least 5 characters and only consist of letters and numbers')
      .isLength({ min: 5 }).isAlphanumeric();
      req.checkBody("email", "must be valid").isEmail();
      req.checkBody("password", "must be at least 8 characters in length")
      .isLength({ min: 8 });
      req.checkBody("passwordConfirmation", "must match provided password")
      .optional().matches(req.body.password);
    }
    const errors = req.validationErrors();
    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  },
}
