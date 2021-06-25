import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const { name, label, value, onChange, ...other } = props;
  return (
    <div>
      <TextField
        variant="outlined"
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        {...other}
        // error
        // helperText="Чет пошло не так :/"
      />
    </div> 
  );
}
