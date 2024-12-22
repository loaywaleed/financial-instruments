import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
    baseURL: apiURL,
    headers: {
        "Content-Type": "application/json",
    },
});
