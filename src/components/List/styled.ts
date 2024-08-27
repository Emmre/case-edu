import styled from "styled-components";
import { ListItem } from "@mui/material";

export const ListItemStyled = styled(ListItem)`
  background-color: #f5f5f5;
  margin-bottom: 10px;
  border-radius: 4px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
