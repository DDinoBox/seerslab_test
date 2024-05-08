const validateEmailAndPassword = (email, password) => {
  const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  if (!emailRegex.test(email)) {
    const err = new Error('INVALID_EMAIL');
    err.statusCode = 400;
    throw err;
  };

  if (!passwordRegex.test(password)) {
    const error = new Error('INVALID_USER_PASSWORD');
    error.statusCode = 400;
    throw error;
  };
};

export default validateEmailAndPassword;