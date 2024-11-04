"use client";
import BranchwiseFooter from "../_components/branchwisepnl/BranchwiseFooter/BranchwiseFooter";
import Brachwisehead from "../_components/branchwisepnl/branchwisehead/Brachwisehead";

import BranchwiseTable from "../_components/branchwisepnl/BranchwiseTable/BranchwiseTable";

function page() {
  return (
    <div className={`layout liability`}>
      <h1 className={`main-head`}>Branch Wise PNL</h1>

      {/* <Remider /> */}
      {/* <AssetsForm /> */}
      {/* <DaybookSelf /> */}

      <div className={`layout-body`}>
        <Brachwisehead />
        <BranchwiseTable />
        <BranchwiseFooter />

        {/* <div className={`layout-table`}>table</div>
  <div className={`layout-footer`}>Footer</div> */}
      </div>
    </div>
  );
}

export default page;
