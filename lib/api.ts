import axios from 'axios';

const API_BASE = 'https://b0s0kwos00g48ow8cg0skg4w.89.116.111.143.sslip.io';

export const fetchInscriptions = async () => {
    const { data } = await axios.get(`${API_BASE}/inscriptions`);
    return data;
};

export const fetchCourses = async () => {
    const { data } = await axios.get(`${API_BASE}/cours`);
    return data;
};

export const fetchNotes = async (matricule: string, mnemonique: string) => {
    const { data } = await axios.get(`${API_BASE}/notes`, {
        params: { matricule, mnemonique },
    });
    return data;
};

export const fetchAllNotes = async () => {
    const { data } = await axios.get(`${API_BASE}/notes`);
    return data;
};
