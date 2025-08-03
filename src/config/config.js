const isDev = true; //false mean staging
export default {
    BASE_URL: isDev ? "http://localhost:8080/" : "https://gro-mart-admin.onrender.com/admin/",
    SUCCESS_TYPE: "success",
    ERROR_TYPE: "error",
    ALERT_TYPE: "alert",
    WARNING_TYPE: "warning",
}