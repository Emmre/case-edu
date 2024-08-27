import React, { useState } from "react";
import { useRouter } from "next/router";
import { Typography, Box, TextField, CircularProgress } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import { ButtonStyled, PaperStyled } from "./styled";
import { ContainerStyled } from "@/styles/global";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInputs {
  username: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { setUserCredentials } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    setLoading(true);
    setTimeout(() => {
      const { username, password } = data;

      if (username === "admin" && password === "admin") {
        setUserCredentials({
          isAuthenticated: true,
          user: { username, password },
        });
        router.push("/patients");
      } else {
        alert("Please try username 'admin' and password 'admin'");
      }

      setLoading(false);
    }, 2000);
  };

  return (
    <ContainerStyled maxWidth="xs">
      <PaperStyled elevation={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            variant="outlined"
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
            defaultValue="admin"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            defaultValue="admin"
          />
          <ButtonStyled
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </ButtonStyled>
        </Box>
      </PaperStyled>
    </ContainerStyled>
  );
};

export default Login;
