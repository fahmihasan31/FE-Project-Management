import api from './http/api';

export default {
    login: async (payload: { email: string; password: string }) => {
        return await api.post('/user/login', payload);
    },
    logout: async (id: number) => {
        return await api.delete(`/user/logout/${id}`);
    },
};
