import React from "react";
import { IconButton, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";

export default function MuiMenu(props) {
  const {
    options,
    itemHeight,
    setConfirmDialog,
    setOpenPopup,
    setRecordForEdit,
    setDataForEdit
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const choosePers = () => {
    const visitor = props.v;
    const coach = props.c;
    if (visitor) {
      return visitor;
    } else if (coach) {
      return coach;
    }
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const chooseMenu = (pers, event) => {
    setAnchorEl(null);
    if (event.target.textContent === "Удалить") {
      return setConfirmDialog({
        isOpen: true,
        id: pers.id,
        photo: pers.photo ? pers.photo : null,
        sportType: pers.sportType,
        title: pers.fullname,
        category: pers.category ? pers.category : null,
        subTitle: pers.category
          ? "Вы уверены, что хотите удалить карточку этого инструктора?"
          : "Вы уверены, что хотите удалить карточку этого посетителя?"
      });
    }
    if (setRecordForEdit) {
      setRecordForEdit({
        coachId: pers.coach ? pers.coach.id : "",
        ...pers
      });
      setOpenPopup(true);
    } else if (setDataForEdit) {
      setDataForEdit(pers);
      setOpenPopup(true);
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: itemHeight * 4.5,
            width: "20ch",
            boxShadow: "none",
            border: "1px solid #E5E5E5"
          }
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={event => {
              chooseMenu(choosePers(), event);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
