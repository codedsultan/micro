import getProfileDetails from "./profile/profileDetails.js";
import changePassword from "./profile/changePassword.js";
import updateProfile from "./profile/updateProfile.js";
import uploadProfilePicture from "./profile-picture/uploadProfilePic.js";
import removeProfilePicture from "./profile-picture/removeProfilePic.js";
import getUserDetails from "./user/getUserDetails.js";
import sendEmailVerificationOtp from "./profile/sendEmailVerificationOtp.js";
import verifyEmail from "./profile/verifyEmail.js";
import changeUsername from "./profile/changeUsername.js";
import checkUsernameAvailable from "./check-username/checkUsernameAvailable.js";
import deleteProfile from "./profile/deleteProfile.js";
import saveDeviceInfo from "./device-info/saveDeviceInfo.js";
import getUserDeviceInfo from "./device-info/getUserDeviceInfo.js";
import deleteDeviceInfo from "./device-info/deleteDeviceInfo.js";
import getUserUrls from "./user/getUserUrls.js";
import searchUrl from "./user/searchUrl.js";
import deactivateAccount from "./profile/deactivateAccount.js";

const userController = {};

userController.getProfileDetails = getProfileDetails;
userController.changePassword = changePassword;
userController.updateProfile = updateProfile;
userController.uploadProfilePicture = uploadProfilePicture;
userController.removeProfilePicture = removeProfilePicture;
userController.getUserDetails = getUserDetails;
userController.sendEmailVerificationOtp = sendEmailVerificationOtp;
userController.verifyEmail = verifyEmail;
userController.changeUsername = changeUsername;
userController.checkUsernameAvailable = checkUsernameAvailable;
userController.deleteProfile = deleteProfile;
userController.saveDeviceInfo = saveDeviceInfo;
userController.getUserDeviceInfo = getUserDeviceInfo;
userController.deleteDeviceInfo = deleteDeviceInfo;
userController.getUserUrls = getUserUrls;
userController.searchUrl = searchUrl;
userController.deactivateAccount = deactivateAccount;

export default userController;