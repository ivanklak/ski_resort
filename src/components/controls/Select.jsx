import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import visPhoto from "./../../assets/images/people-profile.png";

const useStyles = makeStyles(theme => ({
  dropdownStyle: {
    marginLeft: "0px",
    marginTop: "50px",
    maxHeight: "282px",
    "& .MuiMenu-list": {
      marginTop: "15px"
    }
  },
  coachPhoto: {
    width: 40,
    height: 40,
    borderRadius: "20px"
  },
  chooseCoach: {
    display: "flex",
    marginLeft: "10px"
  },
  description: {
    marginLeft: "12px"
  },
  coachName: {
    color: "black",
    fontSize: "15px"
  },
  coachSport: {
    fontSize: "14px",
    color: "grey"
  }
}));

export default function Select(props) {
  const classes = useStyles();
  const { name, label, value, onChange, options } = props;
  return (
    <div>
      <FormControl variant="outlined">
        <InputLabel>{label}</InputLabel>
        <MuiSelect
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          MenuProps={{
            classes: { paper: classes.dropdownStyle },
            variant: "menu"
          }}
        >
          {options.map(item => (
            <MenuItem key={item.id} value={item.id}>
              <div className={classes.chooseCoach}>
                <span>
                  <img src={visPhoto} className={classes.coachPhoto} />
                </span>
                <span className={classes.description}>
                  <div className={classes.coachName}>
                    <span>{item.fullname}</span>
                  </div>
                  <div className={classes.coachSport}>
                    <span>
                      {item.sportType}. Опыт {item.workExperience} лет
                    </span>
                  </div>
                </span>
              </div>
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </div>
  );
}
