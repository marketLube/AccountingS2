import LiabilityHead from "@/components/liability/liabiliityhead/LiabilityHead";

export const metadata = {
  title: "Liability",
};
function Page() {
  return (
    <div className={`layout liability`}>
      <h1 className={`main-head`}>Liability</h1>
      <div className={`layout-body`}>
        <LiabilityHead />
        <div className={`layout-table`}>table</div>
        <div className={`layout-footer`}>Footer</div>
      </div>
    </div>
  );
}

export default Page;
