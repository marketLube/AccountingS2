import { Modal } from "antd";

function DateModal({ children = "", isOpen = false, handleDateModal }) {
  return (
    <Modal
      open={isOpen}
      confirmLoading={true}
      onCancel={handleDateModal}
      className="date-modal"
      footer={null}
      width={"70%"}
    >
      {/* <h4 className="date-title">Select Date</h4> */}
      {children}
    </Modal>
  );
}
export default DateModal;
