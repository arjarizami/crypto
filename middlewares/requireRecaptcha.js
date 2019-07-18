const axios = require('axios');

module.exports = async (req, res, next) => {
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=6LdnOa4UAAAAACWgveJ8Wx4NCQwQ219XPLWY3h9I&response=${
      req.body.token
    }`
  );

  if (!response.data.success) {
    return res.status(403).send({ error: 'Captcha Error!' });
  }

  next();
};
