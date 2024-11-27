"use client";
import CapitalFooter from "../_components/_capital/capitalFooter/CapitalFooter";
import Capitalhead from "../_components/_capital/capitalHead/Capitalhead";
import CapitalTable from "../_components/_capital/capitalTable/CapitalTable";
import { useAuthorize } from "../_hooks/useAuthorize";

function Page() {
  // const isLoggedIn = useAuthorize();
  // if (!isLoggedIn) return <div>Unauthorized</div>;

  return (
    <div className={`layout assetes`}>
      <h1 className={`main-head`}>Capital</h1>
      <div className={`layout-body`}>
        <Capitalhead />
        <CapitalTable />
        <CapitalFooter />
      </div>
    </div>
  );
}

export default Page;
