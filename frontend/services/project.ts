import api from './http/api';

export interface ProjectPayload {
    name: string;
    description: string;
    schedule_start: string;
    schedule_end: string;
    amount: number;
    client_id: string;
}

export default {
    // Projects
    getProjects: async (payload: ProjectPayload) => {
        return await api.get('/project/', { params: payload });
    },
    getProjectsId: async (id: string) => {
        return await api.get(`/project/${id}`);
    },
    postProject: async (payload: any) => {
        return await api.post('/project/', payload);
    },
    putProject: async (payload: ProjectPayload, id: number) => {
        return await api.put(`/project/${id}`, payload);
    },
    deleteProject: async (id: string) => {
        return await api.delete(`/project/${id}`);
    },

    // Documents
    addDocument: async (payload: any) => {
        return await api.post('/project/document', payload);
    },
    getDocumentsByProject: async (id: number) => {
        return await api.get(`/project/document/${id}`);
    },
    deleteDocument: async (id: number) => {
        return await api.delete(`/project/document/${id}`);
    },

    // Skill requirements
    addRequirement: async (payload: any) => {
        return await api.post('/project/requirement', payload);
    },
    getRequirementsByProject: async (id: string) => {
        return await api.get(`/project/requirement/${id}`);
    },
    deleteRequirement: async (id: number) => {
        return await api.delete(`/project/requirement/${id}`);
    },

    // Employee requirements
    addMember: async (payload: any) => {
        return await api.post('/project/member', payload);
    },
    getMembersByProject: async (id: number) => {
        return await api.get(`/project/member/${id}`);
    },
    getMembersByRequirement: async (id: number) => {
        return await api.get(`/project/member/by-requirement/${id}`);
    },
    deleteMember: async (id: number) => {
        return await api.delete(`/project/member/${id}`);
    },
};
