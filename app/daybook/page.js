import DaybookFooter from "@/components/daybook/daybookFooter/DaybookFooter";
import DaybookFooterBtns from "@/components/daybook/daybookFooter/DaybookFooterBtns";
import DaybookHead from "@/components/daybook/daybookhead/DaybookHead";
import DaybookTable from "@/components/daybook/daybookTable/DaybookTable";
import Button from "@/components/utils/Button";

export const metadata = {
  title: "Daybook",
};

function Page() {
  return (
    <div className={`layout daybook`}>
      <h1 className={`main-head`}>Daybook</h1>
      <div className={`layout-body`}>
        <DaybookHead />
        <div className={`layout-table`}>
          <DaybookTable />
        </div>
        <DaybookFooter />
      </div>
    </div>
  );
}

export default Page;
