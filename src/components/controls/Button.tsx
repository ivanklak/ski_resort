import React, { FC } from "react";
import { Button as MiuButton } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    label: {
      textTransform: "none",
      fontSize: "12px",
      fontWeigth: 500
    }
  })
);

type PropsType = {
  text: string;
  size?: "medium" | "large" | "small";
  color?: "inherit" | "default" | "primary" | "secondary";
  variant?: "text" | "outlined" | "contained";
  onClick?: () => void;
  className?: string;
};

const Button: FC<PropsType> = ({
  text,
  size,
  color,
  variant,
  onClick,
  ...other
}) => {
  const classes = useStyles();

  return (
    <div>
      <MiuButton
        variant={variant || "contained"}
        size={size || "small"}
        color={color || "primary"}
        onClick={onClick}
        {...other}
        classes={{ label: classes.label }}
      >
        {text}
      </MiuButton>
    </div>
  );
};
export default Button;
