import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IPatient } from "../store/patientSlice";

export const usePatients = (): IPatient[] => {
  return useSelector((state: RootState) => state.patients.patients);
};
