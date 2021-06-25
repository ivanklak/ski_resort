import React, { FC } from "react";
import { Paper, Container, Grid, Typography, Fab } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import adminPhoto from "./../../../assets/images/people-profile.png";
import CreateIcon from "@material-ui/icons/Create";
import { Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    adminProfile: {
      position: "relative",
      color: theme.palette.common.white,

      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",

      borderRadius: "0px"
    },
    adminInfo: {
      position: "relative",
      paddingTop: theme.spacing(18),
      paddingBottom: theme.spacing(4),
      textAlign: "center"
    },
    adminPhoto: {
      marginBottom: "12px",
      zIndex: 1,
      heigth: "84px",
      width: "84px"
    },
    createAdmin: {
      position: "relative", //исправить
      color: "#B3B3B3",
      background: "#E8EDF1",
      marginTop: "-65px",
      marginLeft: "65px",
      zIndex: 2
    },
    adminName: {
      fontSize: "15px"
    },
    admin: {
      fontSize: "10px",
      color: "#707EF9"
    }
  })
);

const ProfileInfo: FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper
        className={classes.adminProfile}
        style={{ backgroundColor: "#4158F6" }}
      >
        <Container fixed>
          <Grid container>
            <Grid item md={3}>
              <div className={classes.adminInfo}>
                <div>
                  <img className={classes.adminPhoto} src={adminPhoto} />
                </div>
                <div>
                  <Fab
                    className={classes.createAdmin}
                    size="small"
                    aria-label="edit"
                  >
                    <CreateIcon />
                  </Fab>
                </div>

                <Typography className={classes.adminName} color="inherit">
                  Иван Клакоцкий
                </Typography>
                <Typography className={classes.admin}>Администратор</Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  );
};
export default ProfileInfo;
