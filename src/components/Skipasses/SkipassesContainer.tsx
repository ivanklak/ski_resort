import React, { useEffect, FC } from "react";
import { connect } from "react-redux";
import Skipasses from "./Skipasses";
import { requestSkipasses } from "../../Redux/skipasses-reducer";
import { getSkipasses } from "../../Redux/skipasses-selectors";
import { AppStateType } from "../../Redux/redux-store";
import { SkiPassType } from "../Types/types";

type MapStatePropsType = {
  skipasses: Array<SkiPassType>;
};
type MapDispatchPropsType = {
  requestSkipasses: () => void;
};
type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const SkipassesContainer: FC<PropsType> = props => {
  console.log(props);

  useEffect(() => {
    props.requestSkipasses();
  }, []);
  return (
    <div>
      <Skipasses />
    </div>
  );
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    skipasses: getSkipasses(state)
  };
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType,AppStateType>(
  mapStateToProps, 
  { requestSkipasses }
  )(SkipassesContainer);
