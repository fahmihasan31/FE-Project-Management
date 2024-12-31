import api from './http/api';

interface skillData {
    id: string;
    name: string;
}

export default {
    getSkills: async (payload: skillData) => {
        return await api.get('/skill/', { params: payload });
    },
    postSkills: async (payload: skillData) => {
        return await api.post('/skill/', payload);
    },
    putSkills: async (payload: skillData, id: number) => {
        return await api.put(`/skill/${id}`, payload);
    },
    deleteSkills: async (id: number) => {
        return await api.delete(`/skill/${id}`);
    },
};
