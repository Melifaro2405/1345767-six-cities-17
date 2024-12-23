export const validateEmail = (email: string) => {
  const regExValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regExValidEmail.test(email);
};

export const validatePassword = (password: string) => {
  const regExValidPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

  return regExValidPassword.test(password);
};
