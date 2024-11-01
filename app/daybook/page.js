import DaybookFooter from "../_components/daybook/daybookFooter/DaybookFooter";
import DaybookHead from "../_components/daybook/daybookhead/DaybookHead";
import DaybookTable from "../_components/daybook/daybookTable/DaybookTable";

export const metadata = {
  title: "Daybook",
};

function Page() {
  return (
    <div className={`layout daybook`}>
      <h1 className={`main-head`}>Daybook</h1>
      <div className={`layout-body`}>
        <DaybookHead />
        <DaybookTable />
        <DaybookFooter />
      </div>
    </div>
  );
}

export default Page;
