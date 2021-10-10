import axios, { Method } from "axios";

interface RequestConfig {
    url: string;
    method?: Method;
    data?: any;
}

export const request = async <T>(config: RequestConfig) => {
    let { method = "GET", url, data } = config;

    const response = await axios.request<T>({
        url,
        method,
        data,
    });

    return {
        status: response.status,
        data: response.data,
    };
};
