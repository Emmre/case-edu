import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPatient {
  id: string;
  name: string;
  age: number;
  prescriptions: string;
}

interface PatientsState {
  patients: IPatient[];
}

const initialState: PatientsState = {
  patients: [],
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    addPatient: (state, action: PayloadAction<IPatient>) => {
      state.patients.push(action.payload);
    },
    updatePatient: (state, action: PayloadAction<IPatient>) => {
      const index = state.patients.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    deletePatient: (state, action: PayloadAction<string>) => {
      state.patients = state.patients.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addPatient, updatePatient, deletePatient } =
  patientSlice.actions;
export default patientSlice.reducer;
