import React, { useState, FC } from "react";
import { connect } from "react-redux";
import { requestToken } from "../../Redux/token-reducer";
import { Redirect } from "react-router";
import { makeStyles, createStyles } from "@material-ui/styles";
import { fade, Grid, Typography, Button } from "@material-ui/core";
import LoginPhoto from "../../assets/images/Rectangle_588.jpg";
import SnowboardIcon from "../../assets/images/snowboard.svg";
import Controls from "../controls/Controls";

const useStyles = makeStyles(() =>
  createStyles({
    login: {
      zIndex: 3,
      background: `url(${LoginPhoto}) no-repeat center top / cover`,
      position: "absolute",
      height: "100%",
      width: "100%",
      left: "0px",
      top: "0px",
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
      }
    },
    loginContainer: {
      width: "493px",
      height: "606px",
      background: "white",
      borderRadius: "12px",
      textAlign: "center",
      margin: "auto",
      marginTop: "100px"
    },
    snowboardIcon: {
      marginTop: "71px"
    },
    personalAccount: {
      textTransform: "uppercase",
      fontSize: "14px",
      fontWeight: 700,
      color: "#4158F6",
      marginTop: "16px"
    },
    skiResort: {
      textTransform: "uppercase",
      fontSize: "18px",
      fontWeight: 700
    },
    loginInfo: {
      marginLeft: "auto",
      marginRight: "auto"
    },
    inputs: {
      width: "359px",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "50px"
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
      marginTop: "40px",
      marginLeft: "auto",
      marginRight: "auto",
      textTransform: "none",
      fontSize: "12px",
      fontWeigth: 500,
      color: "white"
    },
    allRightsReserved: {
      marginTop: "50px",
      textAlign: "center",
      fontSize: "9px"
    }
  })
);

type PropsType = {
  requestToken: (username: string, password: string) => void;
};

const Login: FC<PropsType> = props => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await props.requestToken(username, password);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.login}>
      <Grid container className={classes.loginContainer}>
        <Grid item xs={12} className={classes.loginInfo}>
          <form onSubmit={submit}>
            <div className={classes.snowboardIcon}>
              <img src={SnowboardIcon} />
            </div>
            <div>
              <Typography className={classes.personalAccount}>
                личный кабинет
              </Typography>
              <Typography className={classes.skiResort}>
                горнолыжного курорта
              </Typography>
            </div>
            <div className={classes.inputs}>
              <Controls.Input
                fullWidth
                name="username"
                label="Имя"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                style={{ height: "44px", background: "#F3F3F3" }}
              />
              <Controls.Input
                fullWidth
                name="password"
                label="Пароль"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                style={{
                  marginTop: "12px",
                  height: "44px",
                  background: "#F3F3F3"
                }}
              />
            </div>
            <Button type="submit" className={classes.addbtn}>
              Войти
            </Button>
          </form>
        </Grid>
      </Grid>
      <div className={classes.allRightsReserved}>
        (с) 2021. Все права защищены
      </div>
    </div>
  );
};

export default connect(null, { requestToken })(Login);
