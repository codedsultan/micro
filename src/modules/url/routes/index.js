import { Router } from "express";
import multerMiddleware from "../../../middlewares/multer.js";
import authMiddleware from "../../../middlewares/auth.js";
import urlController from "../controllers/index.js";

const urlRouter = Router();

const isAuthenticatedUser = authMiddleware.isAuthenticatedUser;

// Authenticated Routes -------------------------------------------------------

urlRouter
  .route("/:shortUrl")
  .post(isAuthenticatedUser,urlController.shortenUrl);

urlRouter
  .route("/get-urls")
  .get(isAuthenticatedUser,urlController.getUrls);

urlRouter
  .route("/get-url-details")
  .get(isAuthenticatedUser,urlController.getUrlDetails);

urlRouter
  .route("/update-url")
  .put(isAuthenticatedUser,urlController.updateUrl);

urlRouter
  .route("/delete-url")
  .delete(isAuthenticatedUser,urlController.deleteUrl);

urlRouter
  .route("/shorten-bitly")
  .post(isAuthenticatedUser,urlController.shortenBitLy);

urlRouter
  .route("/get-url-redirect")
  .get(isAuthenticatedUser,urlController.getUrlRedirect);


export default urlRouter;

