import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import moment from "moment";

const materialTheme = createMuiTheme({});

const DateTimePicker = props => {
  const { name, label, value, onChange, disableFuture, disablePast } = props;

  const convertToDate = (name, value) => ({
    target: {
      name,
      value
    }
  });

  const formateDate = value => {
    let stirngDate = moment(value).format("L");
    return stirngDate;
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <ThemeProvider theme={materialTheme}>
        <KeyboardDateTimePicker
          autoOk
          size="small"
          margin="normal"
          id="date-picker-dialog"
          variant="inline"
          inputVariant="outlined"
          label={label}
          format="dd/MM/yyyy"
          name={name}
          value={value ? formateDate(value) : null}
          disableFuture={disableFuture}
          disablePast={disablePast}
          color="primary"
          onChange={date => onChange(convertToDate(name, date))}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

export default DateTimePicker;
