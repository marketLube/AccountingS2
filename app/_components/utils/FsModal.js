"use client";
import { Modal } from "antd";
import { useDispatch } from "react-redux";

function FsModal({
  isOpen,
  setIsCancel,
  width = "60vw",
  height = "60vh",
  children,
  callback = () => {},
}) {
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(setIsCancel(false));
    callback();
  };
  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      width={width}
      height={height}
      footer={null}
      className="fs-modal"
    >
      {children}
    </Modal>
  );
}

export default FsModal;
