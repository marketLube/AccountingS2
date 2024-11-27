"use client";
import { useSelector } from "react-redux";
import DaybookFooter from "../_components/daybook/daybookFooter/DaybookFooter";
import DaybookHead from "../_components/daybook/daybookhead/DaybookHead";
import DaybookTable from "../_components/daybook/daybookTable/DaybookTable";
import { useAuthorize } from "../_hooks/useAuthorize";

function Page() {
  const isLoggedIn = useAuthorize();
  if (!isLoggedIn) return <div>Unauthorized</div>;

  return (
    <div className={`layout daybook`}>
      <h1 className={`main-head`}>Daybook</h1>
      <div className={`layout-body`}>
        <DaybookHead />
        <DaybookTable />
        <DaybookFooter />
      </div>
    </div>
  );
}

export default Page;
