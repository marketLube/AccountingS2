"use client";
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
        <div className={`layout-table`}>
          <OutstandingTable />
        </div>
        <div className={`layout-footer`}>Footer</div>
      </div>
    </div>
  );
}

export default Page;
