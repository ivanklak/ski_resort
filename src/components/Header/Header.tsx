import React, { FC } from "react";
import { fade, makeStyles, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "1024px"
    },
    menuButton: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(2)
    },
    title: {
      display: "block",
      fontSize: "13px"
    },
    search: {
      position: "relative",
      borderRadius: "12px",
      backgroundColor: "#3841DC",
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: "80px",
      width: "571px",
      height: "30px"
      // [theme.breakpoints.up("sm")]: {
      //   marginLeft: "60px",
      //   width: "100%"
      // }
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "-8px"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "60ch"
      }
    },
    margin: {
      marginLeft: theme.spacing(4.6),
      textTransform: "none"
    }
  })
);

const Header: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          background: "#4158F6",
          boxShadow: "none",
          position: "fixed",
          maxWidth: "1024px"
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <NavLink to="/" style={{ textDecoration: "none", color: "#ffffff" }}>
            <Typography className={classes.title}>
              ГОРНОЛЫЖНЫЙ <br /> КУРОРТ
            </Typography>
          </NavLink>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Поиск"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "Поиск" }}
            />
          </div>
          <Button
            color="inherit"
            disableRipple
            className={classes.margin}
            startIcon={<ExitToAppIcon />}
          >
            Выход
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
