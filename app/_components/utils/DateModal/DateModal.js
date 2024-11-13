import { Modal } from "antd";
import Button from "../Button";

function DateModal({
  handleSelectChange = "",
  dateOptions = [],
  selectedDate = "2024",
  children = "",
  isOpen = false,
  handleDateModal,
}) {
  return (
    <Modal
      open={isOpen}
      confirmLoading={true}
      onCancel={handleDateModal}
      footer={null}
      width={"60%"}
    >
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
