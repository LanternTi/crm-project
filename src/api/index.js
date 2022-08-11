import Arequest from "@/utils/request";
import { BASE_URL, TIME_OUT } from "@/config/request/config";

const request = new Arequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT
})

export default request;