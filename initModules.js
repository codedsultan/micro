import authModule from "./modules/auth/index.js";
import userModule from "./modules/user/index.js";
import adminModule from "./modules/admin/index.js";
import urlModule from "./modules/url/index.js";


const initModules = (app) => {
  authModule.init(app);
  userModule.init(app);
  adminModule.init(app);
  urlModule.init(app);
};

export default initModules;