import React, { FC } from "react";
import { makeStyles, createStyles } from "@material-ui/styles";
import { Grid, Avatar, Typography, fade } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Controls from "../controls/Controls";
import { CoachType } from "../Types/types";

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

type CoachesCardType = CoachType;

type PropsType = {
  coachesCard: CoachesCardType;
  setOpenCard: (b: boolean) => void;
};

const CoachesCard: FC<PropsType> = props => {
  const classes = useStyles();
  const { setOpenCard, coachesCard } = props;

  const onClickOk = () => {
    setOpenCard(false);
  };

  return (
    <Grid container className={classes.card}>
      <Grid item>
        <div>
          <Avatar className={classes.addPhoto}>
            {coachesCard.photo ? (
              coachesCard.photo
            ) : (
              <AddAPhotoIcon
                fontSize="large"
                style={{ width: "58px", height: "53px", color: "#DADADA" }}
              />
            )}
          </Avatar>
        </div>
        <div className={classes.description}>
          <Typography className={classes.fio}>
            {coachesCard.fullname}
          </Typography>
          <Typography className={classes.sportType}>
            {coachesCard.sportType ? coachesCard.sportType : "нет данных"}
            {coachesCard.category
              ? ` (Категория ${coachesCard.category})`
              : " нет данных"}
          </Typography>
        </div>
        <div className={classes.description}>
          <Typography className={classes.descTitle}>дата рождения</Typography>
          <Typography className={classes.descValue}>
            {coachesCard.dateOfBirth ? coachesCard.dateOfBirth : "нет данных"}
          </Typography>
        </div>
        <div className={classes.description}>
          <Typography className={classes.descTitle}>пол</Typography>
          <Typography className={classes.descValue}>
            {coachesCard.sex ? coachesCard.sex : "нет данных"}
          </Typography>
        </div>
        <div className={classes.description}>
          <Typography className={classes.descTitle}>
            назначенный посетитель
          </Typography>
          <Typography className={classes.descValue}>{"нет данных"}</Typography>
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

export default CoachesCard;
