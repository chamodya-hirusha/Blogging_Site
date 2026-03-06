// Mock auth state
let isAuthenticated = false;

export const getAuth = () => isAuthenticated;

export const setAuth = (v: boolean) => {
    isAuthenticated = v;
};
