import React from "react";
import { ListItemText, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ListItemStyled } from "./styled";

interface IProps<T> {
  item: T;
  title: string;
  subtitle: string;
  onButtonClick: (item: T) => void;
  hasDeleteIcon?: boolean;
  hasEditIcon?: boolean;
  onDeleteClick?: (item: T) => void;
  onEditClick?: (item: T) => void;
}

const CustomListItem = <T,>({
  item,
  title,
  subtitle,
  onButtonClick,
  hasDeleteIcon,
  hasEditIcon,
  onDeleteClick,
  onEditClick,
}: IProps<T>) => {
  return (
    <ListItemStyled>
      <ListItemText primary={title} secondary={subtitle} />
      <Box display="flex" alignItems="center">
        {hasEditIcon && (
          <IconButton onClick={() => onEditClick?.(item)} color="primary">
            <EditIcon />
          </IconButton>
        )}
        {hasDeleteIcon && (
          <IconButton onClick={() => onDeleteClick?.(item)} color="error">
            <DeleteIcon />
          </IconButton>
        )}
        <IconButton onClick={() => onButtonClick(item)} color="primary">
          <VisibilityIcon />
        </IconButton>
      </Box>
    </ListItemStyled>
  );
};

export default CustomListItem;
