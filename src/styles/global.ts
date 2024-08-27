import { Box, Button, Container, Typography } from "@mui/material";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  html, body {
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: #333;
    line-height: 1.6;
  }
`;

export const ContainerStyled = styled(Container)`
  height: 100%;
  align-content: center;
`;

export const BoxStyled = styled(Box)`
  padding: 20px;
`;

export const HeaderStyled = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const TitleStyled = styled(Typography)`
  flex-grow: 1;
`;

export const ButtonStyled = styled(Button)`
  margin-left: 8px !important;
`;

export default GlobalStyle;
