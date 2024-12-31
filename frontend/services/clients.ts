import api from './http/api';

interface clientData {
    id: string;
    name: string;
    address: string;
    phone_number: string;
}

export default {
    getClients: async (payload: clientData) => {
        return await api.get('/client/', { params: payload });
    },
    postClients: async (payload: clientData) => {
        return await api.post('/client/', payload);
    },
    putClients: async (payload: clientData, id: number) => {
        return await api.put(`/client/${id}`, payload);
    },
    deleteClients: async (id: number) => {
        return await api.delete(`/client/${id}`);
    },
};
