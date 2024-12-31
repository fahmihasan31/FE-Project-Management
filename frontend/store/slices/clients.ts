import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Services from '@/services/clients';

interface ClientState {
    loading: boolean;
    data: any[];
    error: string | null;
}

const InitialState: ClientState = {
    loading: false,
    data: [],
    error: null,
};

export const getClients = createAsyncThunk('api/getClients', async (payload: any) => {
    const res = await Services.getClients(payload);
    return res.data.data;
});

export const postClients = createAsyncThunk('api/postClients', async (payload: any) => {
    const res = await Services.postClients(payload);
    return res.data.data;
});

export const putClients = createAsyncThunk('api/putClients', async ({ payload, id }: { payload: any; id: number }) => {
    const res = await Services.putClients(payload, id);
    return res.data.data;
});

export const deleteClients = createAsyncThunk('api/deleteClients', async (id: number) => {
    const res = await Services.deleteClients(id);
    return res.data.data;
});

const ClientsSlices = createSlice({
    name: 'clients',
    initialState: InitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClients.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch clients';
            })
            .addCase(postClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postClients.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
                state.error = null;
            })
            .addCase(postClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create client';
            })
            .addCase(putClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(putClients.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex((client) => client.id === action.meta.arg.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(putClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update client';
            })
            .addCase(deleteClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteClients.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter((client) => client.id !== action.meta.arg);
                state.error = null;
            })
            .addCase(deleteClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete client';
            });
    },
});

export default ClientsSlices.reducer;
