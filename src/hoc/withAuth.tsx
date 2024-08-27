import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC = (props) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
      if (!isAuthenticated) {
        router.push("/");
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;
