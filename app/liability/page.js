"use client";
import LiabilityHead from "@/app/_components/liability/liabiliityhead/LiabilityHead";
import Remider from "../_components/_Forms/RemiderForm";
import { Asset } from "next/font/google";
import AssetsForm from "../_components/_Forms/AssetsForm";
import DaybookSelf from "../_components/_Forms/DaybookSelf";
import LiabilityTable from "../_components/liability/LiabilityTable/LiabilityTable";
import LiabilityFooter from "../_components/liability/LiabilityFooter/LiabilityFooter";

// export const metadata = {
//   title: "Liability",
// };
function Page() {
  return (
    <div className={`layout liability`}>
      <h1 className={`main-head`}>Liability</h1>

      {/* <Remider /> */}
      {/* <AssetsForm /> */}
      {/* <DaybookSelf /> */}

      <div className={`layout-body`}>
        <LiabilityHead />
        <LiabilityTable />
        <LiabilityFooter />

        {/* <div className={`layout-table`}>table</div>
      <div className={`layout-footer`}>Footer</div> */}
      </div>
    </div>
  );
}
export default Page;
