import React, { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Avatar,
  IconButton
} from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import Controls from "./Controls";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import { ConfirmType } from "../Types/types";

const useStyles = makeStyles(() =>
  createStyles({
    dialog: {
      height: "579px",
      width: "511px",
      position: "absolute"
    },
    dialogContent: {
      textAlign: "center"
    },
    dialogTitle: {
      display: "flex",
      padding: "12px"
    },
    banner: {
      fontSize: "14px",
      fontWeight: 500
    },
    addPhoto: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "153px",
      height: "153px",
      backgroundColor: "#F3F3F3",
      marginBottom: "22px"
    },
    fio: {
      fontSize: "36px",
      fontWeight: 500
    },
    dialogActions: {
      textAlign: "center"
    },
    sportType: {}
  })
);

type PropsType = {
  title: string;
  confirmDialog: any;
  pageNumber?: number;
  pageSize?: number;
  className?: string;
  setConfirmDialog: (obj: ConfirmType) => void;
  setOpenCard: (b: boolean) => void;
  setOpenPopup: (b: boolean) => void;
  deleteVisitors?: (id: number, pageNumber?: number, pageSize?: number) => void;
  deleteCoaches?: (id: number) => void;
};

const ConfirmDialog: FC<PropsType> = ({
  title,
  confirmDialog,
  setConfirmDialog,
  setOpenCard,
  setOpenPopup,
  pageNumber,
  pageSize,
  deleteVisitors,
  deleteCoaches
}) => {
  const classes = useStyles();

  const onDelete = (id: number): void => {
    if (deleteVisitors) {
      if (!pageNumber && !pageSize) {
        deleteVisitors(id);
        setConfirmDialog({ isOpen: false });
        setOpenCard(false);
        setOpenPopup(false);
      }
      deleteVisitors(id, pageNumber, pageSize);
      setConfirmDialog({ isOpen: false });
      setOpenCard(false);
      setOpenPopup(false);
    } else if (deleteCoaches) {
      deleteCoaches(id);
      setConfirmDialog({ isOpen: false });
      setOpenCard(false);
      setOpenPopup(false);
    }
  };

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle>
        <div className={classes.dialogTitle}>
          <Typography className={classes.banner}>{title}</Typography>
          <IconButton
            size="small"
            color="inherit"
            aria-label="close"
            style={{ marginLeft: "auto" }}
            onClick={() => {
              setConfirmDialog({ isOpen: false });
            }}
          >
            <CloseIcon style={{ fontSize: "14px" }} fontSize="small" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <div>
          <Avatar className={classes.addPhoto}>
            <AddAPhotoIcon
              fontSize="large"
              style={{ width: "58px", height: "53px", color: "#DADADA" }}
            />
          </Avatar>
        </div>
        <Typography className={classes.fio}>{confirmDialog.title}</Typography>
        <Typography className={classes.sportType}>
          {confirmDialog.sportType}{" "}
          {confirmDialog.category
            ? `(Категория ${confirmDialog.category})`
            : null}
        </Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions>
        <Controls.Button
          text="ок"
          color="default"
          onClick={() => {
            onDelete(confirmDialog.id);
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
