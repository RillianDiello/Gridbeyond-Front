import "./Main.css";
import React from "react";
import Header from "./Header";

const Main = ({ title, subtitle, icon, children }) => {
  return (
    <>
      <Header title={title} subtitle={subtitle} icon={icon} />
      <main className="content container-fluid">
        <div className="p-3 mt-3">{children}</div>
      </main>
    </>
  );
};

export default Main;
