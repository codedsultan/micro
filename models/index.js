import DeviceInfo from "./device-info/deviceInfo.js";
import User from "./user/user.js";
import Notification from "./notification/notification.js";
import Url from "./url/url.js";
import OTP from "./otp/otp.js";

const models = {};

models.DeviceInfo = DeviceInfo;
models.User = User;
models.Notification = Notification;
models.Url = Url;
models.OTP = OTP;

export default models;