import express from "express";
import routes from "../routes";


const userRouter = express.Router();

userRouter.get(routes.users, (req, res) => res.send("users"));
userRouter.get(routes.userDetail, (req, res) => res.send("User Detail"));
userRouter.get(routes.editProfile, (req, res) => res.send("user Edit"));
userRouter.get(routes.changePassword, (req, res) => res.send("change password"));

export default userRouter;