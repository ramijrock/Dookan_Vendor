import config from '../../config/config';
import { sendPostData } from '../../utils/requestHelper';


export const register = async (requestObj) => {
	let url = config.BASE_URL + "auth/signup";
	return sendPostData(url, requestObj);
};

export const login = async (requestObj) => {
	let url = config.BASE_URL + "auth/login";
	return sendPostData(url, requestObj);
};