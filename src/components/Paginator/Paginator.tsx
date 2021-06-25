import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pages: {
      marginLeft: "auto",
      fontSize: "12px",
      cursor: "pointer",
      color: "#B9B9B9",
      display: "flex",
      alignItems: "center"
    },
    selectedPage: {
      color: "#4158F6",
      marginRight: "3px",
      marginLeft: "3px"
    },
    unselectedPage: {
      marginRight: "3px",
      marginLeft: "3px"
    },
    pagesBtnLeft: {
      height: "12px",
      width: "12px",
      color: "#4158F6"
    },
    pagesBtnRight: {
      height: "12px",
      width: "12px",
      color: "#4158F6"
    }
  })
);

type PropsType = {
  pageSize: number;
  totalItemsCount: number;
  pageNumber: number;
  onPageChanged: (currentNumber: number) => void;
  portionSize?: number;
};

const Paginator: React.FC<PropsType> = ({
  pageSize,
  totalItemsCount,
  pageNumber,
  onPageChanged,
  portionSize = 3
}) => {
  const classes = useStyles();

  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionsCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionNumber = portionNumber * portionSize;

  return (
    <div className={classes.pages}>
      {portionNumber > 1 && (
        <ArrowBackIcon
          className={classes.pagesBtnLeft}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        />
      )}
      {pages
        .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
        .map(p => {
          return (
            <span
              className={
                (pageNumber === p && classes.selectedPage) ||
                classes.unselectedPage
              }
              onClick={e => {
                onPageChanged(p);
              }}
              key={p}
            >
              {p}
            </span>
          );
        })}
      {portionsCount > portionNumber && (
        <ArrowForwardIcon
          className={classes.pagesBtnRight}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        />
      )}
    </div>
  );
};

export default Paginator;
