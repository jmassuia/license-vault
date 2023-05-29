import api from './api.config.js';
import { showAlert } from './alert.js';

export const disableLicense = async (id) => {
    try {
        await api.delete(`/license/disable/${id}`)
        location.reload();
    }
    catch (err) {
        showAlert("Delete error", err.response.data);
    }
}