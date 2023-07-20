import React from "react";
import Module1 from "../components/Module1";
import Module2 from "../components/Module2";
import Module3 from "../components/Module3";

const Home: React.FC = () => {
  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 text-center lowercase">
      <Module1 />
      <Module2 />
      <Module3 className="col-span-2" />
    </div>
  );
};

export default Home;
