import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addPatient } from "../store/patientSlice";
import { useRouter } from "next/router";
import { PRESCRIPTIONS } from "@/constant";

const NewPatientPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const age = formData.get("age") as string;

    if (!name || !age) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      dispatch(
        addPatient({
          id: new Date().toISOString(),
          name,
          age: parseInt(age, 10),
          prescriptions:
            PRESCRIPTIONS[Math.floor(Math.random() * PRESCRIPTIONS.length)],
        })
      );
      setLoading(false);
      router.push("/patients");
    }, 2000);
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Add New Patient
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="age"
          label="Age"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          required
        />
        <Typography variant="body2" gutterBottom>
          Prescriptions will be added automatically.
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Add Patient"}
        </Button>
      </form>
    </Box>
  );
};

export default NewPatientPage;
