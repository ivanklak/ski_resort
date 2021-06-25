import React, { useEffect, useState, FC } from "react";
import { Grid, makeStyles, Avatar, fade } from "@material-ui/core";
import Controls from "../controls/Controls";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useForm, Form } from "../Form/useForm";
import { Theme, createStyles } from "@material-ui/core/styles";
import {
  NewVisitorType,
  CoachType,
  SkiPassType,
  UpdateVisitorType
} from "../Types/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputs: {
      marginLeft: "53px",
      maxWidth: "359px",
      "& .MuiTextField-root": {
        borderRadius: "10px"
      },
      "& .MuiInputBase-root": {
        borderRadius: "10px"
      },
      "& .MuiFormLabel-root": {
        fontSize: "10px",
        color: "#D3D3D3"
      },
      "& label.Mui-focused": {
        color: "#4158F6"
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#F3F3F3"
        },
        "&:hover fieldset": {
          borderColor: "#4158F6"
        },
        "&.Mui-focused fieldset": {
          borderColor: "#4158F6"
        }
      },
      "& .MuiSelect-icon": {
        color: "#4158F6"
      }
    },
    addHat: {
      display: "flex",
      padding: "36px 36px 34px 41px"
    },
    banner: {
      fontSize: "14px"
    },
    addPhoto: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "153px",
      height: "153px",
      backgroundColor: "#F3F3F3",
      marginBottom: "22px",
      cursor: "pointer"
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
    input: {
      display: "none"
    }
  })
);
type RecordForEditType = {
  id: number;
  fullname: string;
  dateOfBirth: string;
  skiPass: SkiPassType;
  coach: CoachType;
  coachId: number;
  sportType: string;
  photo: string | null;
  dateOfVisit?: string;
};

type PropsType = {
  allCoaches: Array<CoachType>;
  pageNumber?: number;
  pageSize?: number;
  recordForEdit: RecordForEditType | null;

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
  addNewVisitor: (
    visitor: NewVisitorType,
    pageNumber: number,
    pageSize: number
  ) => void;
  setRecordForEdit: (n: any) => void;
  setOpenCard: (b: boolean) => void;
  setOpenPopup: (b: boolean) => void;
};

const initialFieldValues = {
  id: 0,
  fullname: "",
  dateOfBirth: new Date(),
  skiPassExpirationTime: new Date(),
  skiPass: {} as SkiPassType,
  coach: {},
  coachId: 0,
  sportType: ""
};
export type InitialVisitorsValuesType = typeof initialFieldValues;

const AddVisitors: FC<PropsType> = ({
  setOpenPopup,
  recordForEdit,
  setRecordForEdit,
  setOpenCard,
  pageNumber,
  pageSize,
  addNewVisitor,
  updateVisitors,
  allCoaches
}) => {
  const classes = useStyles();
  const { values, setValues, handleInputChange } = useForm(initialFieldValues);
  const [photo, setPhoto] = useState<string>("");

  // const validate = () => {
  //   let temp = {};
  //   temp.fullname = values.fullname ? "" : "This fiel is required";
  //   temp.sportType = values.sportType ? "" : "This fiel is required";
  // };

  const convertDateToString = (date: Date): string => {
    return date
      .toISOString()
      .substring(0, 10)
      .split("-")
      .reverse()
      .join("-");
  };

  const formatDateTimeToString = (date: Date): string => {
    let strDate = date.toISOString().split("T");
    let strTime = strDate[1].split(".");
    let result = `${strDate[0]} ${strTime[0]}`;
    return result;
  };

  const onClickAdd = () => {
    const { fullname, sportType, dateOfBirth, skiPassExpirationTime } = values;
    let birthDay = convertDateToString(dateOfBirth);
    let skiPassTime = formatDateTimeToString(skiPassExpirationTime as Date);
    addNewVisitor(
      { photo, fullname, birthDay, skiPassTime, sportType },
      pageNumber as number,
      pageSize as number
    );
    setOpenPopup(false);
    setRecordForEdit(null);
    setPhoto("");
  };

  const onClickEdit = () => {
    const {
      fullname,
      coachId,
      sportType,
      id,
      dateOfBirth,
      skiPass,
      skiPassExpirationTime
    } = values;
    let birthDay = convertDateToString(dateOfBirth);
    let newSkiPassTime = formatDateTimeToString(skiPassExpirationTime as Date);
    skiPass.expirationTime = newSkiPassTime;
    updateVisitors(
      { photo, id, fullname, birthDay, sportType, skiPass },
      coachId,
      pageNumber as number,
      pageSize as number
    );
    setOpenPopup(false);
    setRecordForEdit(null);
    if (setOpenCard) {
      setOpenCard(false);
    }
    setPhoto("");
  };

  useEffect(() => {
    if (recordForEdit != null)
      if (recordForEdit.photo != null) {
        setPhoto("data:image/png;base64," + recordForEdit.photo);
      }
    setValues({
      ...recordForEdit
    });
  }, [recordForEdit]);

  const onPhotoSelected = ({ target }: any) => {
    if (target.files.length) {
      const fileReader = new FileReader();
      let photoUrl = target.files[0];
      fileReader.readAsDataURL(photoUrl);
      fileReader.onloadend = () => {
        setPhoto(fileReader.result as string);
      };
    }
  };

  return (
    <Form>
      <Grid container>
        <Grid item xs={10} className={classes.inputs}>
          <div>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-photo"
              onChange={onPhotoSelected}
              type="file"
            />
            <label htmlFor="icon-button-photo">
              <Avatar className={classes.addPhoto} component="span" src={photo}>
                <AddAPhotoIcon
                  fontSize="large"
                  style={{ width: "58px", height: "53px", color: "#DADADA" }}
                />
              </Avatar>
            </label>
          </div>
          <Controls.Input
            name="fullname"
            label="ФИО"
            value={values.fullname}
            onChange={handleInputChange}
          />
          <Controls.DatePicker
            label="Дата рождения"
            name="dateOfBirth"
            value={values.dateOfBirth}
            onChange={handleInputChange}
            disableFuture={false}
          />
          {recordForEdit !== null ? (
            <Controls.DateTimePicker
              label="Срок действия ски-пасса"
              name={"skiPassExpirationTime"}
              value={
                values.skiPassExpirationTime
                  ? values.skiPassExpirationTime
                  : values.skiPass.expirationTime
                  ? values.skiPass.expirationTime
                  : ""
              }
              onChange={handleInputChange}
              disablePast="false"
            />
          ) : (
            <Controls.DateTimePicker
              label="Срок действия ски-пасса"
              name={"skiPassExpirationTime"}
              value={values.skiPassExpirationTime}
              onChange={handleInputChange}
              disablePast="false"
            />
          )}
          {recordForEdit !== null ? (
            <Controls.Select
              name="coachId"
              label="Назначить тренера"
              value={values.coachId}
              onChange={handleInputChange}
              options={allCoaches}
            />
          ) : null}
          <Controls.Input
            name="sportType"
            label="Вид спорта"
            value={values.sportType}
            onChange={handleInputChange}
          />
          <div>
            {recordForEdit != null ? (
              <Controls.Button
                text="Принять"
                className={classes.addbtn}
                onClick={onClickEdit}
              />
            ) : (
              <Controls.Button
                text="Добавить"
                className={classes.addbtn}
                onClick={onClickAdd}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default AddVisitors;
