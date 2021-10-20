import React from 'react';
import { fetchJson } from '../../lib/fetch-json';

const BASE_URL = "https://ecomm-service.herokuapp.com"
const storedAccessToken = window.localStorage.getItem('authToken');
const AUTH_DEFAULT_STATE = storedAccessToken
    ? {
          status: 'authenticated',
          accessToken: storedAccessToken,
      }
    : {
          status: 'anonymous',
          accessToken: null,
      };

const AuthContext = React.createContext();

const authReducer = (state, event) => {
    switch (event.type) {
        case 'login':
            return {
                accessToken: event.accessToken,
                status: 'authenticated',
            };

        case 'logout':
            return {
                accessToken: null,
                status: 'anonymous',
            };

        default:
            throw new Error(
                `Unsupported event type ${event.type} in authReducer`
            );
    }
};

export const useAuthState = () => {
    const [state, dispatch] = React.useReducer(authReducer, AUTH_DEFAULT_STATE);

    const login = (accessToken) =>
        dispatch({
            type: 'login',
            accessToken,
        });

    const logout = () =>
        dispatch({
            type: 'logout',
        });

    return {
        ...state,
        login,
        logout,
    };
};

export const AuthProvider = ({ children }) => {
    const auth = useAuthState();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const auth = React.useContext(AuthContext);

    if (!auth) {
        throw new Error('Your application must be wrapped with AuthProvider');
    }

    return auth;
};

const login = (email, password) =>
    fetchJson(`${BASE_URL}/login`, {
        method: 'POST',
        body: {
            username: email,
            password,
        },
    });

const register = async ({ name, email, password, avatar }) => {
    const confirmation = await fetchJson(`${BASE_URL}/register`, {
        method: 'POST',
        body: {
            name,
            email,
            password,
            avatar,
        },
    });

    if (!confirmation.name || !confirmation.email || !confirmation.avatar) {
        throw new Error('Registration error.');
    }

    return confirmation;
};
export const useLogin = () => {
    const auth = React.useContext(AuthContext);

    if (!auth) {
        throw new Error('Your application must be wrapped with AuthProvider');
    }

    return function invokeLogin({ email, password }) {
        return login(email, password).then((res) => {
            auth.login(res.access_token);
            window.localStorage.setItem('authToken', res.access_token);
        });
    };
};

export const useRegister = () => {
    const auth = React.useContext(AuthContext);

    const login = useLogin();

    if (!auth) {
        throw new Error('Your application must be wrapped with AuthProvider');
    }

    return function invokeRegister({ name, email, password, avatar }) {
        return register({ name, email, password, avatar }).then(() => {
            login({ email, password });
        });
    };
};

export const useLogout = () => {
    const auth = React.useContext(AuthContext);

    if (!auth) {
        throw new Error('Your application must be wrapped with AuthProvider');
    }

    return () => {
        auth.logout();
        window.localStorage.removeItem('authToken');
    };
};