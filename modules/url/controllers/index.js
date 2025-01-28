import shortenUrl from "./url/shortenUrl.js";
import getUrls from "./url/getUrls.js";
import getUrlDetails from "./url/getUrlDetails.js";
import updateUrl from "./url/updateUrl.js";
import deleteUrl from "./url/deleteUrl.js";

const urlController = {};

urlController.shortenUrl = shortenUrl;
urlController.getUrls = getUrls;
urlController.getUrlDetails = getUrlDetails;
urlController.updateUrl = updateUrl;
urlController.deleteUrl = deleteUrl;

export default urlController;
