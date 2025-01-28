import shortenUrl from "./url/shortenUrl.js";
import getUrls from "./url/getUrls.js";
import getUrlDetails from "./url/getUrlDetails.js";
import updateUrl from "./url/updateUrl.js";
import deleteUrl from "./url/deleteUrl.js";
import shortenBitLy from "./url/shortenBitLy.js";
import getUrlRedirect from "./url/getUrlRedirect.js";

const urlController = {};

urlController.shortenUrl = shortenUrl;
urlController.shortenBitLy = shortenBitLy;
urlController.getUrls = getUrls;
urlController.getUrlDetails = getUrlDetails;
urlController.updateUrl = updateUrl;
urlController.deleteUrl = deleteUrl;
urlController.getUrlRedirect = getUrlRedirect;


export default urlController;
