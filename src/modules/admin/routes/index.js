import { Router } from "express";
import authMiddleware from "../../../middlewares/auth.js";
import adminController from "../controllers/index.js";

const isAuthenticatedUser = authMiddleware.isAuthenticatedUser;
const authorizeRoles = authMiddleware.authorizeRoles;

const adminRouter = Router();

// Admin Routes  --------------------------------------------------------------------

adminRouter
  .route("/admin/users")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.getAllUsers
  );

adminRouter
  .route("/admin/user/search")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.searchUser
  );

adminRouter
  .route("/admin/user")
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.deleteUser
  )
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.getUserDetails
  );

adminRouter
  .route("/admin/user/update-role")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.updateUserRole
  );

adminRouter
  .route("/admin/user/update-status")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.updateAccountStatus
  );

adminRouter
  .route("/admin/user/update-verification-status")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.updateVerificationStatus
  );

/// URLS

adminRouter
  .route("/admin/get-urls")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.getAllUrls
  );

export default adminRouter;
