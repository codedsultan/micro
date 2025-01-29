// import urlRouter from "./routes/index.js";
import urlRouter from "./routes/index.js";
import shortURlRouter from "./routes/shortUrl.js";

const urlModule = {
  init: (app) => {
    app.use("/api/v1", urlRouter);
    app.use('', shortURlRouter);
    console.log("[module]: url module loaded");
  },
};

export default urlModule;
