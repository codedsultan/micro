import { Router } from "express";

import urlController from "../controllers/index.js";

const shortURlRouter = Router();



shortURlRouter
  .route("/:shortUrl")
  .get(urlController.getUrlRedirect);


export default shortURlRouter;

