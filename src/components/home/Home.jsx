import React from "react";
import Main from "../template/Main";

const Home = () => {  
  return (
    <Main icon="home" title="Send Samples" subtitle="Send a csv">
      <div className="display-4">Wellcome!</div>
      <hr />
      <p className="mb-0">
        System that allows sending a file containing a set of samples
      </p>
    </Main>
   
  );
}

export default Home;
