"use client";

import ManageBank from "../_components/_manage/manageBank/ManageBank";
import ManageBranch from "../_components/_manage/manageBranch/ManageBranch";
import ManageProfileCard from "../_components/_manage/manageProfile/ManageProfileCard";
import Catagory from "../_components/CatagorySelector/Catagory";
import { useState } from "react";

function Page() {
  const [catagory, setCatagory] = useState("");
  const [particular, setParticular] = useState("");
  return (
    <div className={`layout manage`}>
      <h1 className={`main-head`}>Manage</h1>
      <div className="catagory-container">
        <Catagory
          setCatagory={setCatagory}
          setParticular={setParticular}
          particular={particular}
        />
      </div>
      <div className="manage-body">
        <ManageBank />
        <ManageBranch />
        <ManageProfileCard />
      </div>
    </div>
  );
}
export default Page;
