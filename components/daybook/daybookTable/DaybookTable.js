import connectDB from "@/lib/mongoose";
import DaybookTableHead from "./DaybookTableHead";

async function DaybookTable() {
  await connectDB();
  return (
    <div className="table">
      <DaybookTableHead />
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default DaybookTable;
