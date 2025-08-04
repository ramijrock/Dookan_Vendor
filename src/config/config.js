const isDev = false; //false mean staging
export default {
    BASE_URL: isDev ? "http://localhost:8080/" : "https://gromart-backend.onrender.com/",
    SUCCESS_TYPE: "success",
    ERROR_TYPE: "error",
    ALERT_TYPE: "alert",
    WARNING_TYPE: "warning",
}