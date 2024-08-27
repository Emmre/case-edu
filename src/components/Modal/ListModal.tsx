import React, { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
  DialogActions,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { IPatient } from "@/store/patientSlice";

interface IProps {
  open: boolean;
  title: string;
  item: IPatient | null;
  onClose: () => void;
  buttonText?: string;
  loading?: boolean;
}

const CustomModal: FC<IProps> = ({
  open,
  title,
  item,
  onClose,
  buttonText = "Close",
  loading = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {item ? (
              <ListItem
                sx={{ borderBottom: "1px solid #ddd", borderRadius: 1, mb: 1 }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" component="div">
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="textSecondary">
                      Age: {item.age}
                      <br />
                      Prescriptions:
                      <ul style={{ paddingLeft: "20px" }}>
                        <li>{item.prescriptions}</li>
                      </ul>
                    </Typography>
                  }
                />
              </ListItem>
            ) : (
              <ListItem>
                <ListItemText primary="No prescriptions found" />
              </ListItem>
            )}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
