import Button from "../Button";
import QuickDateFilters from "./QuickDateFilters";

function DateModal({
  handleSelectChange = "",
  dateOptions = [],
  selectedDate = "2024",
  children = "",
  isOpen = false,
  handleCancel,
}) {
  return (
    <Modal
      open={isOpen}
      confirmLoading={true}
      onCancel={handleCancel}
      footer={null}
      width={"60%"}
    >
      <QuickDateFilters dateOptions={dateOptions} selectedDate={selectedDate} />
      <h4 className="form-head">Select Date</h4>
      {children}
      <div className="setDate_daybook">
        <Button style={{ backgroundColor: "rgb(39, 1, 100)" }}>Download</Button>
        <Button>Clear</Button>
        <Button>Set Date</Button>
      </div>
    </Modal>
  );
}
export default DateModal;
