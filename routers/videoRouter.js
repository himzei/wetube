import express from "express";
import routes from "../routes"; 
import { getEditVideo, postEditVideo, getUpload, postUpload, videoDetail, deleteVideo } from "../controllers/videoController";
import { onlyPrivate, uploadVideo } from "../middlewares";

const videoRouter = express.Router();


videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video 
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;