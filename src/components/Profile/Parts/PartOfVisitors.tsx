import React, { useState, FC } from "react";
import { Button, makeStyles, fade, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import visPhoto from "./../../../assets/images/people-profile.png";
import { NavLink } from "react-router-dom";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Controls from "../../controls/Controls";
import ConfirmDialog from "../../controls/ConfirmDialog";
import Popup from "../../controls/Popup";
import AddVisitors from "../../Visitors/AddVisitors";
import PopupCard from "../../controls/PopupCard";
import VisitorsCard from "../../Visitors/VisitorsCard";
import { Theme, createStyles } from "@material-ui/core/styles";
import {
  UpdateVisitorType,
  VisitorType,
  CoachType,
  SkiPassType,
  NewVisitorType,
  ConfirmType
} from "../../Types/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visitors: {
      display: "block",
      top: "0px",
      width: "687px",
      height: "421px",
      backgroundColor: "#ffffff",
      borderRadius: "12px"
    },
    vishat: {
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
      fontWeight: 500,
      marginTop: "-5px",
      textTransform: "none"
    },
    banner: {
      fontSize: "14px"
    },
    pages: {
      marginLeft: "auto",
      color: "#4158F6"
    },
    persons: {
      maxWidth: "560px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gridColumnGap: "1rem"
    },
    person: {
      padding: theme.spacing(0),
      marginTop: "14px",
      maxWidth: 280,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      position: "relative",
      overflow: "hidden"
    },
    visPhoto: {
      width: 40,
      height: 40
    },
    description: {
      marginLeft: "12px"
    },
    visName: {
      fontSize: "15px",
      cursor: "pointer"
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
      marginTop: "28px",
      marginRight: "21px",
      textAlign: "right",
      fontSize: "10px",
      color: "#4158F6"
    }
  })
);

const options = ["Редактировать", "Удалить"];
const ITEM_HEIGHT = 48;

type PropsType = {
  pieceOfVisitors: Array<VisitorType>;
  allCoaches: Array<CoachType>;

  deleteVisitors: (id: number) => void;
  addNewVisitor: (
    visitor: NewVisitorType,
    pageNumber: number,
    pageSize: number
  ) => void;
  addCoachToVisitor: (
    visitorId: number,
    coachId: number,
    pageNumber: number,
    pageSize: number
  ) => void;
  updateVisitors: (
    visitor: UpdateVisitorType,
    coachId: number,
    pageNumber: number,
    pageSize: number
  ) => void;
};

const PartOfVisitors: FC<PropsType> = props => {
  // console.log(props);
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmType>({
    isOpen: false,
    id: 0,
    photo: "",
    sportType: "",
    title: "",
    subTitle: ""
  });
  const [visitorsCard, setVisitorsCard] = useState({
    id: 0,
    photo: "",
    fullname: "",
    sportType: "",
    dateOfBirth: "",
    skiPass: {} as SkiPassType,
    coach: {} as CoachType
  });
  const showCard = (v: VisitorType) => {
    setVisitorsCard({
      id: v.id,
      photo: v.photo,
      fullname: v.fullname,
      sportType: v.sportType,
      dateOfBirth: v.dateOfBirth,
      skiPass: v.skiPass,
      coach: v.coach
    });
    setOpenCard(true);
  };

  const convertDate = (date: string) => {
    return date
      .split("-")
      .reverse()
      .join("-");
  };

  const get_current_age = (date: string) => {
    return (
      ((new Date().getTime() - new Date(convertDate(date)).getTime()) /
        (24 * 3600 * 365.25 * 1000)) |
      0
    );
  };

  return (
    <>
      <div className={classes.visitors}>
        <div className={classes.vishat}>
          <Typography className={classes.banner}>Посетители</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon style={{ color: "#4158F6" }} />}
            size="small"
            color="primary"
            className={classes.addbtn}
            onClick={() => setOpenPopup(true)}
          >
            Добавить нового
          </Button>
          <KeyboardArrowUpIcon className={classes.pages} />
        </div>
        <div className={classes.persons}>
          {props.pieceOfVisitors.map(v => (
            <div className={classes.person} key={v.id}>
              <span>
                <img src={visPhoto} className={classes.visPhoto} />
              </span>
              <span className={classes.description}>
                <div className={classes.visName} onClick={() => showCard(v)}>
                  <span>{v.fullname}</span>
                </div>
                <div className={classes.visOld}>
                  <span>{get_current_age(v.dateOfBirth)} лет</span>
                </div>
              </span>
              <div className={classes.rightMenu}>
                <Controls.MuiMenu
                  options={options}
                  v={v}
                  itemHeight={ITEM_HEIGHT}
                  setConfirmDialog={setConfirmDialog}
                  setRecordForEdit={setRecordForEdit}
                  setOpenPopup={setOpenPopup}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <NavLink to="/visitors" style={{ textDecoration: "none" }}>
            <Typography className={classes.all}>
              Все
              <ArrowForwardIcon
                fontSize="small"
                style={{
                  color: "#4158F6",
                  width: "12px",
                  height: "12px",
                  marginLeft: "9px",
                  display: "inline-block",
                  verticalAlign: "middle"
                }}
              />
            </Typography>
          </NavLink>
        </div>
      </div>
      <ConfirmDialog
        title={"Удаление посетителя"}
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        deleteVisitors={props.deleteVisitors}
        setOpenCard={setOpenCard}
        setOpenPopup={setOpenPopup}
      />
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Редактировать посетителя"
        setRecordForEdit={setRecordForEdit}
      >
        <AddVisitors
          addNewVisitor={props.addNewVisitor}
          recordForEdit={recordForEdit}
          setRecordForEdit={setRecordForEdit}
          allCoaches={props.allCoaches}
          setOpenPopup={setOpenPopup}
          setOpenCard={setOpenCard}
          updateVisitors={props.updateVisitors}
          addCoachToVisitor={props.addCoachToVisitor}
        />
      </Popup>
      <PopupCard
        openCard={openCard}
        setOpenCard={setOpenCard}
        setConfirmDialog={setConfirmDialog}
        title={"Карточка посетителя"}
        visitorsCard={visitorsCard}
        setVisitorsCard={setVisitorsCard}
        setOpenPopup={setOpenPopup}
        setRecordForEdit={setRecordForEdit}
      >
        <VisitorsCard setOpenCard={setOpenCard} visitorsCard={visitorsCard} />
      </PopupCard>
    </>
  );
};
export default PartOfVisitors;
