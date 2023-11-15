const { check, validationResult } = require('express-validator');

module.exports = {
  checkLogin: async (req, res, next) => {
    try {
      // Use an array of check middleware
      await Promise.all([
        check('email').isEmail().normalizeEmail().run(req),
        check('password').isLength({ min: 5 }).run(req),
      ]);

      const validation = validationResult(req);

      if (validation.isEmpty()) {
        next();
      } else {
        return res.status(400).json({
          message: 'Validation invalid',
          errors: validation.array(),
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
};
