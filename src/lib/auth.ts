// Mock auth state
let isAuthenticated = false;

export const getAuth = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("admin_auth") === "true";
    }
    return isAuthenticated;
};

export const setAuth = (v: boolean) => {
    isAuthenticated = v;
    if (typeof window !== "undefined") {
        localStorage.setItem("admin_auth", v ? "true" : "false");
    }
};
