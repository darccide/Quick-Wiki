module.exports = {
  validateUsers(req, res, next) {
    if (req.method === "POST") {
      req.checkBody("email", "must be valid").isEmail();
      req.checkBody("password", "must be at least 8 characters in length")
      .isLength({ min: 8 });
      req.checkBody('username', 'must be between 6 and 20 characters')
      .isLength({ min: 6, max: 20 });
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
  }
}
