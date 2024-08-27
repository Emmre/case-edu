import React, { FC, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { IPatient } from "@/store/patientSlice";

interface IProps {
  open: boolean;
  patient: IPatient | null;
  onClose: () => void;
  onSave: (updatedPatient: IPatient) => void;
}

const EditModal: FC<IProps> = ({
  open,
  patient,
  onClose,
  onSave,
}) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<IPatient>({
    defaultValues: {
      id: patient?.id || "",
      name: patient?.name || "",
      age: patient?.age || 0,
      prescriptions: patient?.prescriptions || "",
    },
  });

  useEffect(() => {
    if (patient) {
      reset({
        id: patient.id,
        name: patient.name,
        age: patient.age,
        prescriptions: patient.prescriptions,
      });
    }
  }, [patient, reset]);

  const onSubmit = (data: IPatient) => {
    onSave(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Patient</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            variant="outlined"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Age"
            type="number"
            margin="normal"
            variant="outlined"
            {...register("age", {
              required: "Age is required",
              valueAsNumber: true,
              min: { value: 0, message: "Age must be positive" },
            })}
            error={!!errors.age}
            helperText={errors.age?.message}
          />
          <TextField
            fullWidth
            label="Prescriptions"
            margin="normal"
            variant="outlined"
            {...register("prescriptions", {
              required: "Prescriptions are required",
            })}
            error={!!errors.prescriptions}
            helperText={errors.prescriptions?.message}
            multiline
            rows={4}
            placeholder="Prescriptions"
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
