import React from "react";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import ProfileInfo from "./components/Profile/ProfileInfo/ProfileInfo";
import "./App.css";
import { Route, Redirect } from "react-router";
import VisitorsContainer from "./components/Visitors/VisitorsContainer";
import CoachsContainer from "./components/Coaches/CoachesContainer";
import SkipassesContainer from "./components/Skipasses/SkipassesContainer";
import Settings from "./components/Settings/Settings";

const App = props => {
  if (document.cookie === "") {
    return <Redirect to="/login" />;
  }

  return (
    <div className="app">
      <Header />
      <ProfileInfo />
      <Navbar />
      <div className="app-wrapper-content">
        <Route exact path="/" render={() => <ProfileContainer />} />
        <Route path="/visitors" render={() => <VisitorsContainer />} />
        <Route path="/coachs" render={() => <CoachsContainer />} />
        <Route path="/skipasses" render={() => <SkipassesContainer />} />
        <Route path="/settings" render={() => <Settings />} />
      </div>
    </div>
  );
};

export default App;