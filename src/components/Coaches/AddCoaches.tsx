import React, { useEffect, FC } from "react";
import { Grid, makeStyles, Avatar, fade } from "@material-ui/core";
import Controls from "../controls/Controls";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useForm, Form } from "../Form/useForm";
import { Theme, createStyles } from "@material-ui/core/styles";
import { NewCoachType, CoachType } from "../Types/types";

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
      marginBottom: "22px"
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
      marginTop: "30px",
      marginLeft: "auto",
      marginRight: "auto"
    }
  })
);
type DataForEditType = CoachType;

type PropsType = {
  openCard: boolean;
  dataForEdit: DataForEditType | null;
  updateCoaches: (coach: NewCoachType) => void;
  addNewCoach: (coach: NewCoachType) => void;
  setDataForEdit: (n: any) => void;
  setOpenCard: (b: boolean) => void;
  setOpenPopup: (b: boolean) => void;
};

const initialFieldValues = {
  id: 0,
  fullname: "",
  dateOfBirth: new Date(),
  sex: "",
  category: "",
  sportType: "",
  workExperience: "",
  photo: ""
};

export type InitialCoachesValuesType = typeof initialFieldValues;

const AddCoaches: FC<PropsType> = props => {
  const classes = useStyles();
  const { values, setValues, handleInputChange } = useForm(initialFieldValues);
  const {
    setOpenPopup,
    dataForEdit,
    setDataForEdit,
    openCard,
    setOpenCard
  } = props;

  const convertDate = (date: Date): string => {
    return date
      .toISOString()
      .substring(0, 10)
      .split("-")
      .reverse()
      .join("-");
  };

  const onClickAdd = () => {
    const {
      fullname,
      sex,
      category,
      sportType,
      photo,
      workExperience,
      dateOfBirth
    } = values;
    let birthDay = convertDate(dateOfBirth);
    props.addNewCoach({
      fullname,
      birthDay,
      sex,
      category,
      sportType,
      photo,
      workExperience
    });
    setOpenPopup(false);
    setDataForEdit(null);
  };
  const onClickEdit = () => {
    const {
      fullname,
      sex,
      category,
      sportType,
      photo,
      workExperience,
      id,
      dateOfBirth
    } = values;
    let birthDay = convertDate(dateOfBirth);
    let coachId = id;
    props.updateCoaches({
      coachId,
      fullname,
      birthDay,
      sex,
      category,
      sportType,
      photo,
      workExperience
    });
    setOpenPopup(false);
    setDataForEdit(null);
    if (openCard) {
      setOpenCard(false);
    }
  };

  useEffect(() => {
    if (dataForEdit != null)
      setValues({
        ...dataForEdit
      });
  }, [dataForEdit]);

  return (
    <Form>
      <Grid container>
        <Grid item xs={10} className={classes.inputs}>
          <div>
            <Avatar className={classes.addPhoto}>
              <AddAPhotoIcon
                fontSize="large"
                style={{ width: "58px", height: "53px", color: "#DADADA" }}
              />
            </Avatar>
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
          <Controls.Input
            name="sex"
            label="Пол"
            value={values.sex}
            onChange={handleInputChange}
          />
          <Controls.Input
            name="sportType"
            label="Вид спорта"
            value={values.sportType}
            onChange={handleInputChange}
          />
          <Controls.Input
            name="category"
            label="Категория"
            value={values.category}
            onChange={handleInputChange}
          />
          <Controls.Input
            name="workExperience"
            label="Опыт работы"
            value={values.workExperience}
            onChange={handleInputChange}
          />
          <div>
            {dataForEdit != null ? (
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

export default AddCoaches;
