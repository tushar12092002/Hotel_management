// Set up password with local auth startegy

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/person");

passport.use(
  new LocalStrategy(async (Username, Password, done) => {
    // authentication logic here
    try {
      console.log("received credentials", Username, Password);
      const user = await Person.findOne({ username: Username });
      if (!user) return null, false, { message: "incorrext username" };

      // const isPasswordMatch = user.password === Password ? true : false;
      const isPasswordMatch = await user.comparepassword(Password);

      if (isPasswordMatch) {
        return done(null, user);
      } else return done(null, false, { message: "incorrect password" });
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
