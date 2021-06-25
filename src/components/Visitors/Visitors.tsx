import React, { useState, FC } from "react";
import {
  Button,
  makeStyles,
  fade,
  Typography,
  createStyles
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import visPhoto from "./../../assets/images/people-profile.png";
import AddVisitors from "./AddVisitors";
import Popup from "../controls/Popup";
import ConfirmDialog from "../controls/ConfirmDialog";
import Controls from "../controls/Controls";
import VisitorsCard from "./VisitorsCard";
import PopupCard from "../controls/PopupCard";
import Skeleton from "@material-ui/lab/Skeleton";
import Paginator from "../Paginator/Paginator";
import {
  VisitorType,
  CoachType,
  NewVisitorType,
  UpdateVisitorType,
  SkiPassType,
  ConfirmType
} from "../Types/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visitors: {
      display: "block",
      top: "0px",
      width: "687px",
      height: "894px",
      backgroundColor: "#ffffff",
      borderRadius: "12px"
    },
    vishat: {
      padding: "27px 55px 15px 41px",
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
      borderRadius: "8px",
      marginLeft: "30px",
      fontSize: "12px",
      marginTop: "-5px",
      textTransform: "none",
      fontWeight: 500,
      ["&:hover"]: {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      }
    },
    banner: {
      fontSize: "14px"
    },
    pagesBtnRight: {
      height: "12px",
      width: "12px",
      color: "#4158F6"
    },
    person: {
      padding: theme.spacing(0),
      marginTop: "15px",
      maxWidth: 280,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      position: "relative",
      overflow: "hidden"
    },
    visPhoto: {
      width: 40,
      height: 40,
      borderRadius: "20px"
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
    }
  })
);

const options = ["Редактировать", "Удалить"];
const ITEM_HEIGHT = 48;

type PropsType = {
  visitors: Array<VisitorType>;
  allCoaches: Array<CoachType>;
  pageNumber: number;
  pageSize: number;
  totalVisitorsCount: number;

  deleteVisitors: (id: number, pageNumber?: number, pageSize?: number) => void;
  updateVisitors: (
    visitor: UpdateVisitorType,
    coachId: number,
    pageNumber: number,
    pageSize: number
  ) => void;
  addCoachToVisitor: (
    visitorId: number,
    coachId: number,
    pageNumber: number,
    pageSize: number
  ) => void;
  onPageChanged: (p: number) => void;
  addNewVisitor: (
    visitor: NewVisitorType,
    pageNumber: number,
    pageSize: number
  ) => void;
};

const Visitors: FC<PropsType> = props => {
  // console.log("visitors", props);
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
            className={classes.addBtn}
            onClick={() => setOpenPopup(true)}
          >
            Добавить нового
          </Button>
          <Paginator
            totalItemsCount={props.totalVisitorsCount}
            pageSize={props.pageSize}
            onPageChanged={props.onPageChanged}
            pageNumber={props.pageNumber}
          />
        </div>
        <div className={classes.persons}>
          {props.visitors.map((v: VisitorType) => (
            <div className={classes.person} key={v.id}>
              <span>
                {v.photo != null && v.photo.includes(".png") ? (
                  // <ThemeProvider theme={materialTheme}></ThemeProvider>
                  <Skeleton
                    // animation="wave"
                    variant="circle"
                    width={40}
                    height={40}
                  />
                ) : (
                  <img
                    src={
                      v.photo != null && v.photo != ""
                        ? "data:image/png;base64," + v.photo
                        : visPhoto
                    }
                    className={classes.visPhoto}
                  />
                )}
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
                  setOpenPopup={setOpenPopup}
                  setRecordForEdit={setRecordForEdit}
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
          recordForEdit != null
            ? "Редактировать посетителя"
            : "Добавить нового посетителя"
        }
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
          pageNumber={props.pageNumber}
          pageSize={props.pageSize}
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
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        deleteVisitors={props.deleteVisitors}
        setOpenCard={setOpenCard}
        setOpenPopup={setOpenPopup}
        title={"Удаление посетителя"}
        pageNumber={props.pageNumber}
        pageSize={props.pageSize}
      />
    </>
  );
};
export default Visitors;
