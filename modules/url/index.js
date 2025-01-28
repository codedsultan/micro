import urlRouter from "./routes/index.js";

const urlModule = {
  init: (app) => {
    app.use("/api/v1", urlRouter);
    console.log("[module]: url module loaded");
  },
};

export default urlModule;
