import api from './http/api';

interface loginData {
    email: string;
    password: string;
}

export default {
    login: async (payload: { payload: loginData }) => {
        return await api.post('/user/login-user', payload);
    },
    logout: async (id: number) => {
        return await api.delete(`/user/logout/${id}`);
    },
};
