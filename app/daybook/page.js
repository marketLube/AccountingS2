import DaybookHead from "@/components/daybook/daybookhead/DaybookHead";

export const metadata = {
  title: "Daybook",
};

function Page() {
  return (
    <div className={`layout daybook`}>
      <h1 className={`main-head`}>Daybook</h1>
      <div className={`layout-body`}>
        <DaybookHead />
        <div className={`layout-table`}>table</div>
        <div className={`layout-footer`}>Footer</div>
      </div>
    </div>
  );
}

export default Page;
