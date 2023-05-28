import api from './api.config.js';


export const disableLicense = async (id) => {
    try {
        await api.delete(`/license/disable/${id}`)
    }
    catch (err) {
        console.log(err);
    }
}