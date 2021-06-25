import React from "react";
import { Paper, Button, makeStyles, fade, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    skipasses: {
      display: "block",
      top: "0px",
      width: "687px",
      height: "894px",
      backgroundColor: "#ffffff",
      borderRadius: "12px"
    },
    skihat: {
      padding: "32px 55px 15px 41px",
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
      borderRadius: "8px",
      marginLeft: "30px",
      fontSize: "12px",
      fontWeight: 500,
      marginTop: "-5px",
      textTransform: "none"
    },
    banner: {
      fontSize: "14px"
    },
    pages: {
      marginLeft: "auto",
      fontSize: "10px"
    },
    skibanners: {
      height: "400px"
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
      marginTop: "17px"
    },
    skiInfo: {
      verticalAlign: "middle",
      display: "inline-block",
      marginLeft: "39px"
    },
    skiname: {
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: 700,
      textTransform: "uppercase"
    },
    skiprise: {
      color: "#ffffff",
      fontSize: "24px",
      fontWeight: 700
    }
  })
);

const Skipasses = () => {
  const classes = useStyles();

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
          <Typography className={classes.pages}>1 2 3</Typography>
        </div>
        <div className={classes.skibanners}>
          <Paper
            className={classes.skiItem}
            style={{
              backgroundImage: `url(https://source.unsplash.com/random)`
            }}
          >
            <div className={classes.skiInfo}>
              <Typography className={classes.skiname}>
                Дневной 8:30-16:00
              </Typography>
              <Typography className={classes.skiprise}>3150 р</Typography>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
};
export default Skipasses;
