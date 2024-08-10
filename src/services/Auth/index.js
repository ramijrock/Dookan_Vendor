import config from '../../config/config';
import { sendPostData } from '../../utils/requestHelper';


export const register = async (requestObj) => {
	let url = config.BASE_URL + "register";
	return sendPostData(url, requestObj);
};