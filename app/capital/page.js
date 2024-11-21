import CapitalFooter from "../_components/_capital/capitalFooter/CapitalFooter";
import Capitalhead from "../_components/_capital/capitalHead/Capitalhead";
import CapitalTable from "../_components/_capital/capitalTable/CapitalTable";

function page() {
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

export default page;
