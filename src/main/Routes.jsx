import React from "react";
import { Routes as Routers, Route } from "react-router-dom";

import Home from "../components/home/Home";
import File from "../components/file/File";
import Sample from "../components/sample/Sample";

const Routes = () => {
  return (
    <Routers>
      <Route path="/" exact element={<Home />} />
      <Route path="/files" exact element={<File />} />
      <Route path="/samples/:fileId" exact element={<Sample />} />
    </Routers>
  );
};

export default Routes;
