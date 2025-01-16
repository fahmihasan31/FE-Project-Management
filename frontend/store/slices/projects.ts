import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Services from '@/services/project';

interface ProjectState {
    selectedData: any;
    loading: boolean;
    data: any[];
    error: string | null;
}

const InitialState: ProjectState = {
    loading: false,
    data: [],
    error: null,
    selectedData: {},
};

// Async thunks master project
export const getProjects = createAsyncThunk('api/getProjects', async (payload: any) => {
    const res = await Services.getProjects(payload);
    return res.data.result;
});
export const postProject = createAsyncThunk('api/postProject', async (payload: any) => {
    const res = await Services.postProject(payload);
    return res.data.result;
});
export const getProjectsId = createAsyncThunk('api/getProjectsId', async (id: string | any) => {
    const res = await Services.getProjectsId(id);
    console.log('idnya om', res);
    return res.data.result;
});
export const putProject = createAsyncThunk('api/putProject', async ({ payload, id }: { payload: any; id: number }) => {
    const res = await Services.putProject(payload, id);
    return res.data.result;
});
export const deleteProject = createAsyncThunk('api/deleteProject', async (id: string) => {
    const res = await Services.deleteProject(id);
    return res.data.result;
});

// Async thunks document project
export const addDocument = createAsyncThunk('api/project/addDocument', async (payload: any) => {
    const res = await Services.addDocument(payload);
    return res.data.result;
});
export const getDocumentsByProject = createAsyncThunk('api/project/getDocumentsByProject', async (id: number) => {
    const res = await Services.getDocumentsByProject(id);
    return res.data.result;
});
export const deleteDocument = createAsyncThunk('api/deleteDocument', async (id: number) => {
    const res = await Services.deleteDocument(id);
    return res.data.result;
});

// Async thunks requirement project
export const addRequirement = createAsyncThunk('api/project/addRequirement', async (payload: any) => {
    const res = await Services.addRequirement(payload);
    return res.data.result;
});
export const getRequirementsByProject = createAsyncThunk('api/project/getRequirementsByProject', async (id: string | any) => {
    const res = await Services.getRequirementsByProject(id);
    console.log('respon get requirement', res);
    return res.data.result;
});

export const deleteRequirement = createAsyncThunk('api/deleteRequirement', async (id: number) => {
    const res = await Services.deleteRequirement(id);
    return res.data.result;
});

// Async thunks member project
export const addMember = createAsyncThunk('api/project/addMember', async (payload: any) => {
    const res = await Services.addMember(payload);
    return res.data.result;
});
export const getMembersByProject = createAsyncThunk('api/project/getMembersByProject', async (id: number) => {
    const res = await Services.getMembersByProject(id);
    return res.data.result;
});
export const getMembersByRequirement = createAsyncThunk('api/project/getMembersByRequirement', async (id: number) => {
    const response = await Services.getMembersByRequirement(id);
    console.log('res get member by requirement', response);
    return response.data.result;
});
export const deleteMember = createAsyncThunk('api/deleteMember', async (id: number) => {
    const res = await Services.deleteMember(id);
    return res.data.result;
});

// Slice
const ClientsSlices = createSlice({
    name: 'clients',
    initialState: InitialState,
    reducers: {},
    extraReducers: (builder) => {
        // Projects
        builder
            .addCase(getProjectsId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProjectsId.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedData = action.payload;
                state.error = null;
            })
            .addCase(getProjectsId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to get projects';
            })

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
                state.error = action.error.message || 'Failed to get projects';
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
                    state.data[index] = action.payload;
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
            });

        // Documents
        builder
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
                state.selectedData = action.payload;
                state.error = null;
            })
            .addCase(getDocumentsByProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to get documents';
            })
            .addCase(deleteDocument.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDocument.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedData = state.selectedData.filter((document: { id: number }) => document.id !== action.meta.arg);
                state.error = null;
            })
            .addCase(deleteDocument.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete document';
            });

        // Requirements
        builder
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
                state.selectedData = action.payload;
                state.error = null;
            })
            .addCase(getRequirementsByProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to get requirements';
            })
            .addCase(deleteRequirement.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRequirement.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedData = state.selectedData.filter((req: { id: number }) => req.id !== action.meta.arg);
                state.error = null;
            })
            .addCase(deleteRequirement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete requirement';
            });

        // Members
        builder
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
                state.selectedData = action.payload;
                state.error = null;
            })
            .addCase(getMembersByProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to get members';
            })
            .addCase(getMembersByRequirement.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMembersByRequirement.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedData = action.payload;
                state.error = null;
            })
            .addCase(getMembersByRequirement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to get members by requirement';
            })
            .addCase(deleteMember.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMember.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedData = state.data.filter((member) => member.id !== action.meta.arg);
                state.error = null;
            })
            .addCase(deleteMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete member';
            });
    },
});

export default ClientsSlices.reducer;
