import React, { FC } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import moment from "moment";

const materialTheme = createMuiTheme({
  overrides: {
    MuiPopover: {
      paper: {
        // width: "266px",
        // height: "359px",
        borderRadius: "8px",
        marginLeft: "300px"
      }
    }
    // MuiPickersBasePicker: {
    //   container: {
    //     // boxSizing: "content-box",
    //     // width: "266px",
    //     // height: "359px"
    //   }
    // },
    // MuiPickersToolbar: {
    //   toolbar: {
    //     backgroundColor: "white"
    //   }
    // },
    // MuiPickersToolbarText: {
    //   toolbarTxt: {
    //     color: "#000000",
    //     fontSize: "14px"
    //   },
    //   toolbarBtnSelected: {
    //     color: "#4158F6",
    //     fontSize: "24px",
    //     fontWeight: "500",
    //     textTransform: "uppercase"
    //   }
    // },
    // MuiPickersCalendar: {
    //   transitionContainer: {
    //     // boxSizing: "content-box",
    //     // minHeight: "180px",
    //     // maxHeight: "200px"
    //   }
    // },
    // MuiPickersCalendarHeader: {
    //   switchHeader: {
    //     fontSize: "14px"
    //   }
    // },
    // MuiPickersDay: {
    //   day: {
    //     color: "#000000",
    //     fontSize: "10px",
    //     fontWeight: "300"
    //   },
    //   daySelected: {
    //     backgroundColor: "#4158F6"
    //   },
    //   dayDisabled: {
    //     color: "#ffffff"
    //   },
    //   current: {
    //     color: "#4158F6"
    //   }
    // }
  }
});

type PropsType = {
  name: string;
  label: string;
  value: Date | string;
  onChange: (func: any) => void;
  disableFuture?: boolean;
  disablePast?: boolean;
};

const DatePicker: FC<PropsType> = ({
  name,
  label,
  value,
  onChange,
  disableFuture,
  disablePast
}) => {
  const convertToDate = (name: string, value: Date | null) => ({
    target: {
      name,
      value
    }
  });

  const convertingDate = (date: string): string => {
    let newDate = date
      .split("-")
      .reverse()
      .join("-");
    return newDate;
  };

  //сначала value = *Mon May 24 2021 16:11:59 GMT+0200 (CEST)* и это объект
  //после этого value изменяется на дату рождения визитора, которая приходит как строка из бизнеса
  //мы берем строку и форматируем в объект *Mon May 24 ...* - DatePicker читает такой формат даты
  //когда редактируем дату в календаре, дата приходит в виде объекта *Mon May 24 ...*, форматируем в строку для инпута
  const formateDate = (value: Date | string) => {
    if (typeof value !== "object" && value) {
      let obgDate = convertingDate(value);
      return moment(obgDate).format("llll");
    } else if (typeof value === "object" && value) {
      let stirngDate = moment(value).format("L");
      return stirngDate;
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <ThemeProvider theme={materialTheme}>
        <KeyboardDatePicker
          autoOk
          size="small"
          margin="normal"
          id="date-picker-dialog"
          variant="inline"
          inputVariant="outlined"
          label={label}
          format="dd/MM/yyyy"
          name={name}
          value={formateDate(value)}
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

export default DatePicker;
