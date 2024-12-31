import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Services from '@/services/project';

interface ProjectState {
    loading: boolean;
    data: any[];
    error: string | null;
}

const InitialState: ProjectState = {
    loading: false,
    data: [],
    error: null,
};

// Async thunks master project
export const getProjects = createAsyncThunk('api/getProjects', async (payload: any) => {
    const res = await Services.getProjects(payload);
    return res.data.data;
});
export const postProject = createAsyncThunk('api/postProject', async (payload: any) => {
    const res = await Services.postProject(payload);
    console.log('res post', res);
    return res.data.data;
});
export const putProject = createAsyncThunk('api/putProject', async ({ payload, id }: { payload: any; id: number }) => {
    const res = await Services.putProject(payload, id);
    return res.data.data;
});
export const deleteProject = createAsyncThunk('api/deleteProject', async (id: number) => {
    const res = await Services.deleteProject(id);
    return res.data.data;
});

// Async thunks document project
export const addDocument = createAsyncThunk('api/project/addDocument', async (payload: any) => {
    const res = await Services.addDocument(payload);
    return res.data.data;
});
export const getDocumentsByProject = createAsyncThunk('api/project/getDocumentsByProject', async (id: number) => {
    const response = await Services.getDocumentsByProject(id);
    return response.data;
});
export const deleteDocument = createAsyncThunk('api/deleteDocument', async (id: number) => {
    const res = await Services.deleteDocument(id);
    return res.data.data;
});

// Async thunks requirement project
export const addRequirement = createAsyncThunk('api/project/addRequirement', async (payload: any) => {
    const res = await Services.addRequirement(payload);
    return res.data.data;
});
export const getRequirementsByProject = createAsyncThunk('api/project/getRequirementsByProject', async (id: number) => {
    const response = await Services.getRequirementsByProject(id);
    return response.data;
});
export const deleteRequirement = createAsyncThunk('api/deleteRequirement', async (id: number) => {
    const res = await Services.deleteRequirement(id);
    return res.data.data;
});

// Async thunks member project
export const addMember = createAsyncThunk('api/project/addMember', async (payload: any) => {
    const res = await Services.addMember(payload);
    return res.data.data;
});
export const getMembersByProject = createAsyncThunk('api/project/getMembersByProject', async (id: number) => {
    const response = await Services.getMembersByProject(id);
    return response.data;
});
export const getMembersByRequirement = createAsyncThunk('api/project/getMembersByRequirement', async (id: number) => {
    const response = await Services.getMembersByRequirement(id);
    return response.data;
});
export const deleteMember = createAsyncThunk('api/deleteMember', async (id: number) => {
    const res = await Services.deleteMember(id);
    return res.data.data;
});

// Slice
const projectSlice = createSlice({
    name: 'projects',
    initialState: InitialState,
    reducers: {},
    extraReducers: (builder) => {
        // Projects
        builder
            .addCase(getProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch project';
            })
            .addCase(postProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postProject.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
                state.error = null;
            })
            .addCase(postProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create project';
            })
            .addCase(putProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(putProject.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex((project) => project.id === action.meta.arg.id);
                if (index !== -1) {
                    state.data[index] = { ...state.data[index], ...action.payload };
                }
                state.error = null;
            })
            .addCase(putProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update project';
            })
            .addCase(deleteProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter((project) => project.id !== action.meta.arg);
                state.error = null;
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete project';
            })

            // Documents
            .addCase(addDocument.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addDocument.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
                state.error = null;
            })
            .addCase(addDocument.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add document';
            })
            .addCase(getDocumentsByProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDocumentsByProject.fulfilled, (state, action) => {
                state.loading = false;
                // Assuming the documents are part of the project data
                const project = state.data.find((project) => project.id === action.payload.projectId);
                if (project) {
                    project.documents = action.payload.documents;
                }
                state.error = null;
            })
            .addCase(getDocumentsByProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch documents';
            })
            .addCase(deleteDocument.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDocument.fulfilled, (state, action) => {
                state.loading = false;
                // Assuming the documents are part of the project data
                state.data.forEach((project) => {
                    project.documents = project.documents.filter((doc: { id: number }) => doc.id !== action.meta.arg);
                });
                state.error = null;
            })
            .addCase(deleteDocument.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete document';
            })

            // Requirements
            .addCase(addRequirement.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRequirement.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
                state.error = null;
            })
            .addCase(addRequirement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add requirement';
            })
            .addCase(getRequirementsByProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRequirementsByProject.fulfilled, (state, action) => {
                state.loading = false;
                // Assuming the requirements are part of the project data
                const project = state.data.find((project) => project.id === action.payload.projectId);
                if (project) {
                    project.requirements = action.payload.requirements;
                }
                state.error = null;
            })
            .addCase(getRequirementsByProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch requirements';
            })
            .addCase(deleteRequirement.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRequirement.fulfilled, (state, action) => {
                state.loading = false;
                // Assuming the requirements are part of the project data
                state.data.forEach((project) => {
                    project.requirements = project.requirements.filter((req: { id: number }) => req.id !== action.meta.arg);
                });
                state.error = null;
            })
            .addCase(deleteRequirement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete requirement';
            })

            // Members
            .addCase(addMember.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMember.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
                state.error = null;
            })
            .addCase(addMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add member';
            })
            .addCase(getMembersByProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMembersByProject.fulfilled, (state, action) => {
                state.loading = false;
                // Assuming members are part of the project data
                const project = state.data.find((project) => project.id === action.payload.projectId);
                if (project) {
                    project.members = action.payload.members;
                }
                state.error = null;
            })
            .addCase(getMembersByProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch members';
            })
            .addCase(getMembersByRequirement.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMembersByRequirement.fulfilled, (state, action) => {
                state.loading = false;
                // Handle logic for requirement-specific members if necessary
                state.error = null;
            })
            .addCase(getMembersByRequirement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch members for requirement';
            })
            .addCase(deleteMember.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMember.fulfilled, (state, action) => {
                state.loading = false;
                // Assuming the members are part of the project data
                state.data.forEach((project) => {
                    project.members = project.members.filter((member: { id: number }) => member.id !== action.meta.arg);
                });
                state.error = null;
            })
            .addCase(deleteMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete member';
            });
    },
});

export default projectSlice.reducer;
