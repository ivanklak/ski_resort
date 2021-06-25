import React, { useState, FC } from "react";
import { makeStyles, fade, Typography, createStyles, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import visPhoto from "./../../assets/images/people-profile.png";
import Popup from "../controls/Popup";
import AddCoaches from "./AddCoaches";
import Controls from "../controls/Controls";
import ConfirmDialog from "../controls/ConfirmDialog";
import PopupCard from "../controls/PopupCard";
import CoachesCard from "./CoachesCard";
import Paginator from "../Paginator/Paginator";
import { CoachType, NewCoachType, ConfirmType } from "../Types/types";
import { Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    coaches: {
      display: "block",
      top: "0px",
      width: "687px",
      height: "894px",
      backgroundColor: "#ffffff",
      borderRadius: "12px"
    },
    coacheshat: {
      padding: "32px 55px 15px 41px",
      display: "flex"
    },
    persons: {
      maxWidth: "560px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gridColumnGap: "1rem"
    },
    addBtn: {
      width: "154px",
      height: "32px",
      border: "1px solid #4158F6",
      color: "#4158F6",
      backgroundColor: "#ffffff",
      ["&:hover"]: {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      borderRadius: "8px",
      marginLeft: "30px",
      fontSize: "12px",
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
    person: {
      padding: theme.spacing(0),
      marginTop: "17px",
      maxWidth: 280,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      position: "relative",
      overflow: "hidden"
    },
    coachPhoto: {
      width: 40,
      height: 40,
      cursor: "pointer"
    },
    description: {
      marginLeft: "12px"
    },
    coachName: {
      fontSize: "15px",
      cursor: "pointer"
    },
    coachSport: {
      fontSize: "14px",
      lineHeight: "20px",
      color: "rgba(0, 0, 0, 0.543846)"
    },
    rightMenu: {
      marginLeft: "auto"
    }
  })
);

const options = ["Редактировать", "Удалить"];
const ITEM_HEIGHT = 48;

type PropsType = {
  coaches: Array<CoachType>;
  pageNumber: number;
  pageSize: number;
  totalCoachesCount: number;

  deleteCoaches: (id: number) => void;
  updateCoaches: (coach: NewCoachType) => void;
  onPageChanged: (p: number) => void;
  addNewCoach: (coach: NewCoachType) => void;
};

const Coaches: FC<PropsType> = props => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [dataForEdit, setDataForEdit] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmType>({
    isOpen: false,
    id: 0,
    photo: "",
    sportType: "",
    category: "",
    title: "",
    subTitle: ""
  });
  const [coachesCard, setCoachesCard] = useState({
    id: 0,
    photo: "",
    fullname: "",
    sportType: "",
    dateOfBirth: "",
    category: "",
    sex: ""
  });

  const showCard = (coach: CoachType) => {
    setCoachesCard({
      id: coach.id,
      photo: coach.photo,
      fullname: coach.fullname,
      sportType: coach.sportType,
      category: coach.category,
      dateOfBirth: coach.dateOfBirth,
      sex: coach.sex
    });
    setOpenCard(true);
  };

  return (
    <>
      <div className={classes.coaches}>
        <div className={classes.coacheshat}>
          <Typography className={classes.banner}>Инструкторы</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon style={{ color: "#4158F6" }} />}
            size="small"
            color="primary"
            className={classes.addBtn}
            onClick={() => setOpenPopup(true)}
          >
            Добавить нового
          </Button>
          <Paginator
            totalItemsCount={props.totalCoachesCount}
            pageSize={props.pageSize}
            onPageChanged={props.onPageChanged}
            pageNumber={props.pageNumber}
          />
        </div>
        <div className={classes.persons}>
          {props.coaches.map(c => (
            <div className={classes.person} key={c.id}>
              <span>
                <img
                  src={visPhoto}
                  className={classes.coachPhoto}
                  onClick={() => showCard(c)}
                />
              </span>
              <span className={classes.description}>
                <div className={classes.coachName} onClick={() => showCard(c)}>
                  <span>{c.fullname}</span>
                </div>
                <div className={classes.coachSport}>
                  <span>
                    {c.sportType}. Опыт{" "}
                    {c.workExperience != null ? c.workExperience : 0} лет
                  </span>
                </div>
              </span>
              <div className={classes.rightMenu}>
                <Controls.MuiMenu
                  options={options}
                  c={c}
                  itemHeight={ITEM_HEIGHT}
                  setConfirmDialog={setConfirmDialog}
                  setOpenPopup={setOpenPopup}
                  setDataForEdit={setDataForEdit}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title={
          dataForEdit != null
            ? "Редактировать инструктора"
            : "Добавить нового инструктора"
        }
        setDataForEdit={setDataForEdit}
      >
        <AddCoaches
          setOpenPopup={setOpenPopup}
          addNewCoach={props.addNewCoach}
          dataForEdit={dataForEdit}
          setDataForEdit={setDataForEdit}
          openCard={openCard}
          setOpenCard={setOpenCard}
          updateCoaches={props.updateCoaches}
        />
      </Popup>
      <PopupCard
        openCard={openCard}
        setOpenCard={setOpenCard}
        setConfirmDialog={setConfirmDialog}
        title={"Карточка инструктора"}
        coachesCard={coachesCard}
        setCoachesCard={setCoachesCard}
        setOpenPopup={setOpenPopup}
        setDataForEdit={setDataForEdit}
      >
        <CoachesCard setOpenCard={setOpenCard} coachesCard={coachesCard} />
      </PopupCard>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        deleteCoaches={props.deleteCoaches}
        setOpenPopup={setOpenPopup}
        setOpenCard={setOpenCard}
        title={"Удаление инструктора"}
      />
    </>
  );
};
export default Coaches;
