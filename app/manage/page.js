"use client";

import ManageBank from "../_components/_manage/manageBank/ManageBank";
import ManageBranch from "../_components/_manage/manageBranch/ManageBranch";
import ManageProfileCard from "../_components/_manage/manageProfile/ManageProfileCard";

function page() {
  return (
    <div className={`layout manage`}>
      <h1 className={`main-head`}>Manage</h1>
      <div className="manage-body">
        <ManageBank />
        <ManageBranch />
        <ManageProfileCard />
      </div>
    </div>
  );
}

export default page;
