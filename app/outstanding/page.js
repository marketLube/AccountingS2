"use client";
import OutstandingFooter from "../_components/outstanding/outstandingFooter/OutstandingFooter";
import OutstandingFooterBtns from "../_components/outstanding/outstandingFooter/OutstandingFooterBtns";
import OutstandingHead from "../_components/outstanding/outstandingHead/OutstandingHead";
import OutstandingTable from "../_components/outstanding/outstandingTable/OutstandingTable";

// export const metadata = {
//   title: "Outstanding",
// };
function Page() {
  return (
    <div className={`layout outstanding`}>
      <h1 className={`main-head`}>Outstanding</h1>
      <div className={`layout-body`}>
        <OutstandingHead />
        <OutstandingTable />
        <OutstandingFooter />
      </div>
    </div>
  );
}

export default Page;
