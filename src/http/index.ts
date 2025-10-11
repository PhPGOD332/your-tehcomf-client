import axios, {InternalAxiosRequestConfig} from "axios";
import {AuthResponse} from "@/types/response/AuthResponse";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Базовый путь
const $api = axios.create({
    withCredentials: true,
    baseURL: `${NEXT_PUBLIC_API_URL}/api`,
    // headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`
    // }
});

// Настройка куки
$api.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // if (typeof config !== 'undefined') {
    // if (!authorization) {
        //     return;
        // }
    // config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    // }
    // console.log(config)
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response &&
            error.response.status == 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                await axios.get<AuthResponse>(
                    `${NEXT_PUBLIC_API_URL}/refresh`,
                    { withCredentials: true },
                );

                // console.log(response)

                // if (error)
                //     localStorage.setItem("token", response.data.accessToken);

                return $api.request(originalRequest);
            } catch (e) {
                console.log("НЕ АВТОРИЗОВАН: " + e);
            }
        }
        throw error;
    },
);

export default $api;
