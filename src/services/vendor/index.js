import config from "../../config/config";
import { sendAuthPostData } from "../../utils/requestHelper";

export const createVendor = async (requestObj) => {
	let url = config.BASE_URL + "vendor/create";
	return sendAuthPostData(url, requestObj);
};