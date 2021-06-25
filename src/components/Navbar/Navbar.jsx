import React from "react";
import { Link } from "react-router-dom";
import {
  ListItemIcon,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  Grid,
  Paper,
  FormControlLabel,
  Switch,
  withStyles
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles(() =>
  createStyles({
    navigation: {
      position: "relative",
      float: "left",

      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",

      borderRadius: "0px",
      height: "100vw"
    },
    navbar: {
      color: "#A5AAAD"
    },
    listText: {
      fontSize: "12px"
    }
  })
);

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1)
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none"
      }
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff"
    }
  },
  thumb: {
    width: 24,
    height: 24
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  checked: {},
  focusVisible: {}
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  );
});

const menuItems = [
  {
    listIcon: <PeopleAltIcon fontSize="small" />,
    listText: "Посетители",
    listPath: "/visitors"
  },
  {
    listIcon: <RecordVoiceOverIcon fontSize="small" />,
    listText: "Инструкторы",
    listPath: "/coachs"
  },
  {
    listIcon: <ChromeReaderModeIcon fontSize="small" />,
    listText: "Ски-пассы",
    listPath: "/skipasses"
  },
  {
    listIcon: <SettingsIcon fontSize="small" />,
    listText: "Настройки",
    listPath: "/settings"
  }
];

const Navbar = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <>
      <Paper
        className={classes.navigation}
        style={{ backgroundColor: "#E8EDF1" }}
      >
        <Container fixed className={classes.navbar}>
          <Grid container>
            <Grid item md={3}>
              <Box component="div">
                <List>
                  {menuItems.map((i, key) => (
                    <ListItem
                      button
                      key={key}
                      style={{ borderRadius: "10px" }}
                      component={Link}
                      to={i.listPath}
                    >
                      <ListItemIcon className={classes.navbar}>
                        {i.listIcon}
                      </ListItemIcon>
                      <ListItemText
                        className={classes.listText}
                        primary={i.listText}
                      />
                    </ListItem>
                  ))}
                </List>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                    />
                  }
                  label="Режим администратора"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

export default Navbar;
