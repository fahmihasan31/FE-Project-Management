import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/themeConfigSlice';
import ClientsSlices from '@/store/slices/clients';
import SkillsSlices from '@/store/slices/skills';
import EmployeesSlices from '@/store/slices/employees';
import AuthSlices from '@/store/slices/auth';
import ProjectsSlices from '@/store/slices/projects';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    Clients: ClientsSlices,
    Skills: SkillsSlices,
    Employees: EmployeesSlices,
    Auth: AuthSlices,
    Projects: ProjectsSlices,
});
const store = configureStore({
    reducer: rootReducer,
});

// export default configureStore({
//     reducer: rootReducer,
// });

// export type IRootState = ReturnType<typeof rootReducer>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof rootReducer>;

export default store;
