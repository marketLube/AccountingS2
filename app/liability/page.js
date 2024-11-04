"use client";
import LiabilityHead from "@/app/_components/liability/liabiliityhead/LiabilityHead";
import LiabilityTable from "../_components/liability/LiabilityTable/LiabilityTable";
import LiabilityFooter from "../_components/liability/LiabilityFooter/LiabilityFooter";

// export const metadata = {
//   title: "Liability",
// };
function Page() {
  return (
    <div className={`layout liability`}>
      <h1 className={`main-head`}>Liability</h1>
      <div className={`layout-body`}>
        <LiabilityHead />
        <LiabilityTable />
        <LiabilityFooter />
      </div>
    </div>
  );
}
export default Page;
