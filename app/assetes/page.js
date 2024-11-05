import Assetshead from "../_components/_assetes/assetesHead/Assetshead";
import AssetsTable from "../_components/_assetes/assetesTable/AssetesTable";
import AssetsFooter from "../_components/_assetes/assetsFooter/AssetsFooter";

function page() {
  return (
    <div className={`layout assetes`}>
      <h1 className={`main-head`}>Assets</h1>

      {/* <Remider /> */}
      {/* <AssetsForm /> */}
      {/* <DaybookSelf /> */}

      <div className={`layout-body`}>
        <Assetshead />
        <AssetsTable />
        <AssetsFooter />

        {/* <div className={`layout-table`}>table</div>
<div className={`layout-footer`}>Footer</div> */}
      </div>
    </div>
  );
}

export default page;
