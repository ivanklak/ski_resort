import React from "react";
import { makeStyles, fade, Typography, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import visPhoto from "./../../../assets/images/people-profile.png";
import { NavLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
  coachs: {
    display: "block",
    top: "0px",
    width: "687px",
    height: "421px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    marginTop: "20px"
  },
  coachhat: {
    padding: "25px 33px 25px 41px",
    display: "flex"
  },
  addbtn: {
    width: "154px",
    height: "32px",
    border: "1px solid #4158F6",
    color: "#4158F6",
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    boxSizing: "border-box",
    borderRadius: "8px",
    marginLeft: "30px",
    fontSize: "12px",
    fontWeight: "500",
    marginTop: "-5px",
    textTransform: "none",
  },
  banner: {
    fontSize: "14px"
  },
  pages: {
    marginLeft: "auto",
    color: "#4158F6"
  },
  persons: {
    height: "268px"
  },
  person: {
    padding: theme.spacing(0),
    marginLeft: "50px",
    maxWidth: 280,
    display: "flex",
    alignItems: "center"
  },
  visPhoto: {
    width: 40,
    height: 40
  },
  description: {
    marginLeft: "12px"
  },
  visName: {
    fontSize: "15px"
  },
  visOld: {
    fontSize: "14px",
    lineHeight: "20px",
    color: "rgba(0, 0, 0, 0.543846)"
  },
  rightMenu: {
    marginLeft: "auto"
  },
  all: {
    marginTop: "45px",
      marginRight: "21px",
      textAlign: "right",
      fontSize: "10px",
      color: "#4158F6",
  }
}));

const options = ["Назначить посетителя", "Редактировать", "Удалить"];

const ITEM_HEIGHT = 48;

const PartOfCoachs = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <div className={classes.coachs}>
        <div className={classes.coachhat}>
          <Typography className={classes.banner}>Инструкторы</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon style={{ color: "#4158F6" }} />}
            size="small"
            color="primary"
            className={classes.addbtn}
          >
            Добавить нового
          </Button>
          <KeyboardArrowUpIcon className={classes.pages} />
        </div>
        <div className={classes.persons}>
        <div className={classes.person}>
          <span>
            <div>
              <NavLink to={"/"}>
                <img src={visPhoto} className={classes.visPhoto} />
              </NavLink>
            </div>
          </span>
          <span className={classes.description}>
            <div className={classes.visName}>
              <span>Аркадий Григорьев</span>
            </div>
            <div className={classes.visOld}>
              <span>24 года</span>
            </div>
          </span>
          <div className={classes.rightMenu}>
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
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch"
                }
              }}
            >
              {options.map(option => (
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={handleClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        </div>
        <div>
            <NavLink to="/coachs" style={{ textDecoration: "none"}}>
            <Typography className={classes.all}>
                Все 
                <ArrowForwardIcon fontSize="small" style={{ color: "#4158F6", width: "12px", height: "12px", marginLeft: "9px", display: "inline-block",
  verticalAlign: "middle"}}/>
            </Typography>
            </NavLink>
            
        </div>
      </div>
    </>
  );
};
export default PartOfCoachs;
