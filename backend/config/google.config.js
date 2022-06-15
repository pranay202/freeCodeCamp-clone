import googleOAuth from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config({
  path: require("path").resolve(__dirname, "../.env"),
});
import User from "../models/userModel.js";

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "522691258935-pb39b7654oj0t45qo7na4u296g35qkc9.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:5000/api/users/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        // creating a new user object
        const newUser = {
          name: profile.displayName,
          email: profile.emails[0].value,
          pic: profile.photos[0].value,
          token: accessToken
        };
        try {
          // check if the user exist
          const user = await User.findOne({ email: newUser.email });

          if (user) {
            // generate token
            const token = user.generateJwtToken();
            // return user
            done(null, { user, token });
          } else {
            // create new user
            const user = await User.create(newUser);

            // generate token
            const token = user.generateJwtToken();
            // return user
            done(null, { user, token });
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((userData, done) => done(null, { ...userData }));
  passport.deserializeUser((id, done) => done(null, id));
};