const passport=require("passport");
const GoogleStrategy=require("passport-google-oauth20").Strategy

passport.serializeUser( (user, done) => {
	done(null,user);
});

passport.deserializeUser((user, done) =>{
	done(null, user);
});
passport.use(new GoogleStrategy({
	clientID:"1046709530386-s8344j34c4jqdeu2nnekor38g6tugc3h.apps.googleusercontent.com",
	clientSecret:"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",
	callbackURL: "http://localhost:5000/google/callback"
	},
	(token,tokenSecret, profile, done) => {
		return done(null,profile);
	}
));
