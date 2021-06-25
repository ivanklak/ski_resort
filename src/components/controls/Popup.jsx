import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    width: "511px",
    height: "722px",
    borderRadius: "12px"
  },
  banner: {
    fontSize: "14px",
    fontWeight: "500"
  },
  addHut: {
    display: "flex",
    padding: "10px 5px 12px 12px",
    alignItems: "center"
  }
}));

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup, setRecordForEdit, setDataForEdit } = props;
  const classes = useStyles();

  const setOnClick = () => {
    if (setRecordForEdit) {
      setRecordForEdit(null);
    } else if (setDataForEdit) {
      setDataForEdit(null)
    }
    setOpenPopup(false);
  };

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle>
        <div className={classes.addHut}>
          <Typography className={classes.banner}>{title}</Typography>
          <IconButton
            size="small"
            color="inherit"
            aria-label="close"
            style={{ marginLeft: "auto" }}
            onClick={() => {
              setOnClick();
            }}
          >
            <CloseIcon style={{ fontSize: "14px" }} fontSize="small" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
