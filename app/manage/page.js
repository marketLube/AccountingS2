"use client";

import ManageBank from "../_components/_manage/manageBank/ManageBank";
import ManageBranch from "../_components/_manage/manageBranch/ManageBranch";
import ManageProfileCard from "../_components/_manage/manageProfile/ManageProfileCard";
import { useState } from "react";

function page() {
  // const [catagory, setCatagory] = useState("");
  // const [particular, setParticular] = useState("");
  return (
    <div className={`layout manage`}>
      <h1 className={`main-head`}>Manage</h1>
      {/* <Category
        setCatagory={setCatagory}
        setParticular={setParticular}
        particular={particular}
      /> */}
      <div className="manage-body">
        <ManageBank />
        <ManageBranch />
        <ManageProfileCard />
      </div>
    </div>
  );
}
export default page;
