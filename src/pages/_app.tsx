import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../store";
import { AuthProvider } from "@/context/AuthContext";
import GlobalStyle from "@/styles/global";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: any;
}

const MyApp: React.FC<MyAppProps> = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <CssBaseline />
            <GlobalStyle />
            <Component {...pageProps} />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </CacheProvider>
  );
};

export default MyApp;
