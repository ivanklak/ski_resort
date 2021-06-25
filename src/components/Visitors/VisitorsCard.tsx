import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Avatar, Typography, fade } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Controls from "../controls/Controls";
import { createStyles } from "@material-ui/core/styles";
import { VisitorType } from "../Types/types";

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      textAlign: "center",
      justifyContent: "center"
    },
    addPhoto: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "153px",
      height: "153px",
      backgroundColor: "#F3F3F3",
      marginBottom: "22px"
    },
    description: {
      marginTop: "30px"
    },
    fio: {
      fontSize: "36px",
      fontWeight: 500
    },
    addbtn: {
      display: "block",
      width: "169px",
      height: "46px",
      backgroundColor: "#4158F6",
      "&:hover": {
        backgroundColor: fade("#4158F6", 0.75)
      },
      borderRadius: "21px",
      marginTop: "50px",
      marginLeft: "auto",
      marginRight: "auto"
    },
    descTitle: {
      textTransform: "uppercase",
      fontSize: "12px",
      color: "#A0A0A0"
    },
    descValue: {
      fontSize: "20px",
      fontWeight: 500
    },
    sportType: {
      color: "#707EF9",
      fontSize: "14px"
    }
  })
);

type VisitorCardType = VisitorType;

type PropsType = {
  visitorsCard: VisitorCardType;
  setOpenCard: (b: boolean) => void;
};

const VisitorsCard: FC<PropsType> = props => {
  const classes = useStyles();
  const { setOpenCard, visitorsCard } = props;

  const onClickOk = () => {
    setOpenCard(false);
  };

  return (
    <Grid container className={classes.card}>
      <Grid item>
        <div>
          <Avatar
            className={classes.addPhoto}
            src={
              visitorsCard.photo
                ? "data:image/png;base64," + visitorsCard.photo
                : ""
            }
          >
            <AddAPhotoIcon
              fontSize="large"
              style={{ width: "58px", height: "53px", color: "#DADADA" }}
            />
          </Avatar>
        </div>
        <div className={classes.description}>
          <Typography className={classes.fio}>
            {visitorsCard.fullname}
          </Typography>
          <Typography className={classes.sportType}>
            {visitorsCard.sportType ? visitorsCard.sportType : "нет данных"}
          </Typography>
        </div>
        <div className={classes.description}>
          <Typography className={classes.descTitle}>дата рождения</Typography>
          <Typography className={classes.descValue}>
            {visitorsCard.dateOfBirth ? visitorsCard.dateOfBirth : "нет данных"}
          </Typography>
        </div>
        <div className={classes.description}>
          <Typography className={classes.descTitle}>номер скипасса</Typography>
          <Typography className={classes.descValue}>
            {visitorsCard.skiPass ? visitorsCard.skiPass.number : "нет данных"}
          </Typography>
        </div>
        <div className={classes.description}>
          <Typography className={classes.descTitle}>
            назначенный тренер
          </Typography>
          <Typography className={classes.descValue}>
            {visitorsCard.coach ? visitorsCard.coach.fullname : "нет данных"}
          </Typography>
        </div>
        <div>
          <Controls.Button
            text="ОК"
            className={classes.addbtn}
            onClick={onClickOk}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default VisitorsCard;
