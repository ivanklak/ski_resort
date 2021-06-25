import React from "react";
import { Paper, Button, makeStyles, fade, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { NavLink } from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


const useStyles = makeStyles(theme => ({
  skipasses: {
    display: "block",
    top: "0px",
    width: "687px",
    height: "542px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    marginTop: "20px"
  },
  skihat: {
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
  skibanners: {
      height: "400px",
  },
  skiItem: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",

    borderRadius: "8px",
    height: "120px",
    lineHeight: "120px",
    width: "576px",
    marginLeft: "55px",

  },
  skiInfo: {
    verticalAlign: "middle",
    display: "inline-block",
    marginLeft: "39px"
  },
  skiname: {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "700",
    textTransform: "uppercase",

},
skiprise: {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "700",
},
  rightMenu: {
    marginLeft: "auto"
  },
  all: {
      marginTop: "23px",
      marginRight: "21px",
      textAlign: "right",
      fontSize: "10px",
      color: "#4158F6",
  },
  
}));

const PartOfSkipasses = () => {
  const classes = useStyles();
  const clickHandler = () => {};

  return (
    <>
      <div className={classes.skipasses}>
        <div className={classes.skihat}>
          <Typography className={classes.banner}>Ски-пассы</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon style={{ color: "#4158F6" }} />}
            size="small"
            color="primary"
            className={classes.addbtn}
          >
            Добавить новый
          </Button>
          <KeyboardArrowUpIcon className={classes.pages} />
        </div>
        <div className={classes.skibanners}>
                <Paper className={classes.skiItem} style={{ backgroundImage: `url(https://source.unsplash.com/random)`}}>
                    <div className={classes.skiInfo}>
                        <Typography className={classes.skiname}>
                Дневной 8:30-16:00
                </Typography>
                <Typography className={classes.skiprise}>3150 р</Typography>
                    </div>
                </Paper>
        </div>
        <div>
        <NavLink to="/skipasses" style={{ textDecoration: "none"}}>
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
export default PartOfSkipasses;
