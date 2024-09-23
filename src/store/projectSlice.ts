import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Project = {
  id: string;
  customer: string;
  refNumber: string;
  projectName: string;
  projectNumber: string;
  areaLocation: string;
  address: string;
  dueDate: string;
  contact: string;
  manager: string;
  staff: string;
  status: string;
  email: string;
  comments: string;
};

type ProjectState = {
  projects: Project[];
};

const initialState: ProjectState = {
  projects: [], 
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex((proj) => proj.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((proj) => proj.id !== action.payload);
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
  },
});

export const { addProject, updateProject, deleteProject, setProjects } = projectSlice.actions;

export default projectSlice.reducer;
