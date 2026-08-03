const loginData = {
  application: {
    loginPath: "/login",

    email:
      "realey-login@1bjhpbwd.mailosaur.net",

    password:
      "#Test1234",
  },

  invalidUser: {
    email:
      "invalid-user@1bjhpbwd.mailosaur.net",

    password:
      "WrongPassword@123",
  },

  mailosaur: {
    emailAddress:
      "realey-login@1bjhpbwd.mailosaur.net",

    /*
     * Leave blank initially.
     * This avoids exact-subject mismatch.
     */
    subject: "",

    emailTimeout: 110_000,

    otpPattern:
      /Your login code[\s\S]*?(\d{6})/i,
  },

  expected: {
    successUrlPattern:
      /dashboard|profile|home|account/i,
  },
};

module.exports = {
  loginData,
};