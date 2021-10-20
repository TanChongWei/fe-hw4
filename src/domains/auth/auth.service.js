import { fetchJson } from "../../lib/fetch-json"
const BASE_URL = "https://ecomm-service.herokuapp.com"

export const getActiveUser = (accessToken, signal) => {
    console.log('checking user')
    return fetchJson(`${BASE_URL}/whoami`, {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        signal,
    });
}
