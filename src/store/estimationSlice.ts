import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Estimation {
  id: string;
  version: string;
  project: string;
  client: string;
  createdDate: string;
  lastModified: string;
  status: string;
  sections: Section[];
}

interface Section {
  id: string;
  title: string;
  items: Item[];
}

interface Item {
  id: string;
  title: string;
  description: string;
  unit: string;
  quantity: number;
  price: number;
  margin: number;
  total: number;
}

type EstimationState = {
  estimations: Estimation[];
  filter: string;
};

const initialState: EstimationState = {
  estimations: [],
  filter: '',
};

const estimationSlice = createSlice({
  name: 'estimations',
  initialState,
  reducers: {
    setEstimations: (state, action: PayloadAction<Estimation[]>) => {
      state.estimations = action.payload;
    },
    addEstimation: (state, action: PayloadAction<Estimation>) => {
      state.estimations.push(action.payload);
    },
    updateEstimation: (state, action: PayloadAction<Estimation>) => {
      const index = state.estimations.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.estimations[index] = action.payload;
      }
    },
    deleteEstimation: (state, action: PayloadAction<string>) => {
      state.estimations = state.estimations.filter((e) => e.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const { setEstimations, addEstimation, updateEstimation, deleteEstimation, setFilter } = estimationSlice.actions;

export default estimationSlice.reducer;
