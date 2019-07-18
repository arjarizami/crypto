const axios = require('axios');
const { recaptchaKey } = require('../config/keys');

module.exports = async (req, res, next) => {
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaKey}&response=${
      req.body.token
    }`
  );

  if (!response.data.success) {
    return res.status(403).send({ error: 'Captcha Error!' });
  }

  next();
};
