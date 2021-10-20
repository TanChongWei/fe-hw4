const BASE_URL = "https://ecomm-service.herokuapp.com"

export const getActiveUser = (accessToken, signal) =>
    fetch(`${BASE_URL}/whoami`, {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        signal,
    }).then((res) => res.json());
