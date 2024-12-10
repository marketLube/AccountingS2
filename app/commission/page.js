import CommissionFooter from "../_components/_commission/commissionFooter/CommissionFooter";
import Commissionhead from "../_components/_commission/commissionHead/Commissionhead";
import CommissionTable from "../_components/_commission/commissionTable/CommissionTable";

function page() {
  return (
    <div className={`layout commition`}>
      <h1 className={`main-head`}>Commission</h1>
      <div className={`layout-body`}>
        <Commissionhead />
        <CommissionTable />
        <CommissionFooter />
      </div>
    </div>
  );
}

export default page;
