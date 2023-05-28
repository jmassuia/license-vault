import api from "./api.config.js";

export const login = async (email, password) => {
    const data = { email, password }
    try {
        const result = await api.post('/user/login', data);

        if (result.status === 200) {
            localStorage.setItem("data", result.data.data);
            window.setTimeout(() => {
                location.assign(`/licenses/${result.data.data}`);
            }, 1500);
        }
    }
    catch (err) {
        console.log(err.message)
    }
}

export const reset = async (email, password) => {
    const data = { email, newPassword: password }
    try {
        const result = await api.patch('/user/reset', data);

        if (result.status === 200) {
            window.setTimeout(() => {
                location.assign("/login");
            }, 1500);
        }
    }
    catch (err) {
        console.log(err.message)
    }
}

export const signUp = async (name, email, password) => {
    const data = { name, email, password }
    try {
        const result = await api.post('/user/signup', data);

        if (result.status === 201) {
            window.setTimeout(() => {
                location.assign("/login");
            }, 1500);
        }
    }
    catch (err) {
        console.log(err.message)
    }
}