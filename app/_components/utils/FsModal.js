"use client";
import { Modal } from "antd";
import { useDispatch } from "react-redux";

function FsModal({
  isOpen,
  setIsCancel,
  width = "50vw",
  height = "50vh",
  children,
}) {
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(setIsCancel(false));
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
