import Login from "@/components/Login";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React from "react";

const Home: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    router.push("/patients");
  }

  return <Login />;
};

export default Home;
