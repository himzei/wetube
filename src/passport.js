import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook"; 
import { facebookLogin, githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy());   

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GH_ID, 
            clientSecret: process.env.GH_SECRET, 
            callbackURL: `http://localhost:4000${routes.githubCallback}`
        }, 
        githubLoginCallback
    )
)

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FB_ID, 
            clientSecret: process.env.FB_SECRET, 
            callbackURL: `https://calm-bullfrog-80.loca.lt/${routes.facebookCallback}`
        }, 
        facebookLogin
    )
)

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());