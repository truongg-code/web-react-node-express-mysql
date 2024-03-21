import React from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import { Outlet } from "react-router-dom";
import Feedback from "../../../Feedback";

const LayoutFeedBack = () => {
  return (
    <>
      <Header />
      <main className="App">
        <Outlet />
      </main>
      <Feedback />
      <Footer />
    </>
  );
};

export default LayoutFeedBack;
