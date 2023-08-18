import React, { useState } from "react";
import Tables from "../components/Tables";
import Modals from "../components/Modals";

function Home() {
  const [data, setData] = useState([]);
  
  return (
    <div>
      <Tables data = {data} setData={setData}/>
      <Modals setData={setData} />
    </div>
  );
}

export default Home;
