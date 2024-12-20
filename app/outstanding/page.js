"use client";
import OutstandingFooter from "../_components/outstanding/outstandingFooter/OutstandingFooter";
import OutstandingHead from "../_components/outstanding/outstandingHead/OutstandingHead";
import OutstandingTable from "../_components/outstanding/outstandingTable/OutstandingTable";
import { useAuthorize } from "../_hooks/useAuthorize";

// export const metadata = {
//   title: "Outstanding",
// };
function Page() {
  const isLoggedIn = useAuthorize();

  if (!isLoggedIn) return <div>Unauthorized</div>;
  return (
    <div className={`layout outstanding`}>
      <h1 className={`main-head`}>Receivables</h1>
      <div className={`layout-body`}>
        <OutstandingHead />
        <OutstandingTable />
        <OutstandingFooter />
      </div>
    </div>
  );
}

export default Page;
