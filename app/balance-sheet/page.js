import BalanceSheetTable from "@/components/balance-sheet/balancesheetTable/BalanceSheetTable";
import LayoutHead from "@/components/layouts/LayoutHead";
import Button from "@/components/utils/Button";

export const metadata = {
  title: "Balance Sheet",
};
function Page() {
  return (
    <div className={`layout balance-sheet`}>
      <h1 className={`main-head`}>Balance Sheet</h1>
      <div className={`balance-sheet-body`}>
        <div className="balance-sheet-head">
          <Button type="thertiary">All Month</Button>
        </div>
        <BalanceSheetTable />
        <div className="balance-sheet-bank"></div>
        <div className="balance-sheet-footer"></div>
      </div>
    </div>
  );
}

export default Page;
