"use client";
import Assetshead from "../_components/_assetes/assetesHead/Assetshead";
import AssetsTable from "../_components/_assetes/assetesTable/AssetesTable";
import AssetsFooter from "../_components/_assetes/assetsFooter/AssetsFooter";
import { useAuthorize } from "../_hooks/useAuthorize";

function Page() {
  // const isLoggedIn = useAuthorize();
  // if (!isLoggedIn) return <div>Unauthorized</div>;

  return (
    <div className={`layout assetes`}>
      <h1 className={`main-head`}>Assets</h1>

      <div className={`layout-body`}>
        <Assetshead />
        <AssetsTable />
        <AssetsFooter />
      </div>
    </div>
  );
}

export default Page;
