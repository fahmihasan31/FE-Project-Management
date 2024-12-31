import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Services from '@/services/employees';

interface EmployeeState {
    loading: boolean;
    data: any[];
    error: string | null;
}

const InitialState: EmployeeState = {
    loading: false,
    data: [],
    error: null,
};

export const getEmployees = createAsyncThunk('api/getEmployees', async (payload: any) => {
    const res = await Services.getEmployees(payload);
    return res.data.data;
});

export const postEmployees = createAsyncThunk('api/postEmployees', async (payload: any) => {
    const res = await Services.postEmployees(payload);
    return res.data.data;
});

export const putEmployees = createAsyncThunk('api/putEmployees', async ({ payload, id }: { payload: any; id: number }) => {
    const res = await Services.putEmployees(payload, id);
    console.log('update data', res);
    return res.data.data;
});

export const deleteEmployees = createAsyncThunk('api/deleteEmployees', async (id: number) => {
    const res = await Services.deleteEmployees(id);
    return res.data;
});

const EmployeesSlices = createSlice({
    name: 'employees',
    initialState: InitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch employees';
            })
            .addCase(postEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
                state.error = null;
            })
            .addCase(postEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create employee';
            })
            .addCase(putEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(putEmployees.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex((employee) => employee.id === action.meta.arg.id);
                if (index !== -1) {
                    state.data[index] = { ...state.data[index], ...action.payload };
                }
                state.error = null;
            })
            .addCase(putEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update employee';
            })
            .addCase(deleteEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter((employee) => employee.id !== action.meta.arg);
                state.error = null;
            })
            .addCase(deleteEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete employee';
            });
    },
});

export default EmployeesSlices.reducer;
