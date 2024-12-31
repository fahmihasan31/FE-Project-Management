import api from './http/api';

interface EmployeeSkill {
    id: string;
    master_skill?: {
        id: number;
        name: string;
    };
    rate: number;
}

interface employeeData {
    name: string;
    latest_education: string;
    skills: EmployeeSkill[];
}

export default {
    getEmployees: async (payload: employeeData) => {
        return await api.get('/employee/', { params: payload });
    },
    postEmployees: async (payload: employeeData) => {
        return await api.post('/employee/', payload);
    },
    putEmployees: async (payload: employeeData, id: number) => {
        return await api.put(`/employee/${id}`, payload);
    },
    deleteEmployees: async (id: number) => {
        return await api.delete(`/employee/${id}`);
    },
};
