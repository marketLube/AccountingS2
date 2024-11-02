import LiabilityHead from "@/app/_components/liability/liabiliityhead/LiabilityHead";
import Remider from "../_components/_Forms/RemiderForm";

export const metadata = {
  title: "Liability",
};
function Page() {
  return (
    <div className={`layout liability`}>
      <h1 className={`main-head`}>Liability</h1>

      <Remider />
      {/* <div className={`layout-body`}>
        <LiabilityHead />
        <div className={`layout-table`}>table</div> */}
      {/* <div className={`layout-footer`}>Footer</div> */}
      {/* </div> */}
    </div>
  );
}
export default Page;
