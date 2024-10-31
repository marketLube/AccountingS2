import Button from "@/components/utils/Button";
import DaybookFooterBtns from "./DaybookFooterBtns";

function DaybookFooter() {
  return (
    <>
      <div className={`layout-footer`}>
        <div className="layout-footer-left">
          <DaybookFooterBtns />
        </div>
        <div className="layout-footer-right">world</div>
      </div>
      <div className="layout-footer-bottom">
        <Button>Download Report</Button>
        <Button>Total</Button>
      </div>
    </>
  );
}

export default DaybookFooter;
