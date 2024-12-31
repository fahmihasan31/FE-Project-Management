import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Services from '@/services/skills';

interface SkillState {
    loading: boolean;
    data: any[];
    error: string | null;
}

const InitialState: SkillState = {
    loading: false,
    data: [],
    error: null,
};

export const getSkills = createAsyncThunk('api/getSkills', async (payload: any) => {
    const res = await Services.getSkills(payload);
    return res.data.data;
});

export const postSkills = createAsyncThunk('api/postSkills', async (payload: any) => {
    const res = await Services.postSkills(payload);
    return res.data.data;
});

export const putSkills = createAsyncThunk('api/putSkills', async ({ payload, id }: { payload: any; id: number }) => {
    const res = await Services.putSkills(payload, id);
    return res.data.data;
});

export const deleteSkills = createAsyncThunk('api/deleteSkills', async (id: number) => {
    const res = await Services.deleteSkills(id);
    return res.data;
});

const ClientsSlices = createSlice({
    name: 'clients',
    initialState: InitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSkills.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSkills.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getSkills.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch clients';
            })
            .addCase(postSkills.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postSkills.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
                state.error = null;
            })
            .addCase(postSkills.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create skill';
            })
            .addCase(putSkills.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(putSkills.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex((skill) => skill.id === action.meta.arg.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(putSkills.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update client';
            })
            .addCase(deleteSkills.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSkills.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter((client) => client.id !== action.meta.arg);
                state.error = null;
            })
            .addCase(deleteSkills.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete client';
            });
    },
});

export default ClientsSlices.reducer;
