import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export const useForm = (initialFieldValues) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  };
};

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiFormControl-root": {
      width: "359px",
      height: "44px",
      marginTop: theme.spacing(2),
      backgroundColor: "#F3F3F3",
      borderRadius: "12px"
    },
    "& .MuiFormLabel-root": {
      fontSize: "10px"
    },
    "& .MuiInputBase-root": {
      borderRadius: "12px",
      height: "44px"
    },
    "& .MuiFormControl-marginNormal": {
      marginBottom: "0"
    },
    "& .MuiSelect-root": {
      borderRadius: "12px"
    }
  }
}));

export const Form = (props) => {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
};
