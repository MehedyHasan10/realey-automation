const loginData = {
  application: {
    loginPath: "/login",

    email:
      "realey-login@1bjhpbwd.mailosaur.net",

    password:
      "#Test1234",

    otp:
      "123456",
  },

  invalidUser: {
    email:
      "invalid-user@1bjhpbwd.mailosaur.net",

    password:
      "WrongPassword@123",
  },

  expected: {
    successUrlPattern:
      /dashboard|profile|home|account/i,
  },
};

module.exports = {
  loginData,
};
