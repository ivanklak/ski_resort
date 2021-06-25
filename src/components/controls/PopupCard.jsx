import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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

export default function PopupCard(props) {
  const {
    title,
    children,
    openCard,
    setConfirmDialog,
    visitorsCard,
    coachesCard,
    setOpenPopup,
    setRecordForEdit,
    setDataForEdit
  } = props;
  const classes = useStyles();

  const chooseCard = () => {
    if (visitorsCard) {
      return visitorsCard;
    } else if (coachesCard) {
      return coachesCard;
    }
  };

  const onClickDelete = card => {
    setConfirmDialog({
      isOpen: true,
      id: card.id,
      photo: card.photo ? card.photo : null,
      sportType: card.sportType,
      category: card.category ? card.category : null,
      title: card.fullname,
      subTitle: card.category
        ? "Вы уверены, что хотите удалить карточку этого инструктора?"
        : "Вы уверены, что хотите удалить карточку этого посетителя?"
    });
  };

  const openInPopup = item => {
    if (visitorsCard) {
      setRecordForEdit({
        coachId: item.coach ? item.coach.id : "",
        ...item
      });
      setOpenPopup(true);
    } else if (coachesCard) {
      setDataForEdit(item);
      setOpenPopup(true);
    }
  };

  return (
    <Dialog
      open={openCard}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle>
        <div className={classes.addHut}>
          <Typography className={classes.banner}>{title}</Typography>
          <div style={{ marginLeft: "auto" }}>
            <IconButton
              size="small"
              color="inherit"
              aria-label="close"
              style={{ marginRight: "5px" }}
              onClick={() => {
                openInPopup(chooseCard());
              }}
            >
              <EditIcon
                style={{ fontSize: "22px", color: "GrayText" }}
                fontSize="large"
              />
            </IconButton>
            <IconButton
              size="small"
              color="inherit"
              aria-label="close"
              onClick={() => {
                onClickDelete(chooseCard());
              }}
            >
              <DeleteIcon
                style={{ fontSize: "22px", color: "GrayText" }}
                fontSize="large"
              />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
