import React from "react";
import { makeStyles, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  settings: {
    display: "block",
    top: "0px",
    width: "687px",
    height: "894px",
    backgroundColor: "#ffffff",
    borderRadius: "12px"
  },
  sethat: {
    padding: "25px 55px 25px 41px",
    display: "flex"
  },
  banner: {
    fontSize: "14px"
  }
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.settings}>
        <div className={classes.sethat}>
          <Typography className={classes.banner}>Настройки</Typography>
        </div>
        <Box component="div">
          <Typography>Тут какие-то настройки</Typography>
        </Box>
      </div>
    </>
  );
};
export default Settings;
