import React from "react";
import { Modal } from "antd";

const CustomModal = ({ visible, title, children, onOk, onCancel, confirmLoading }) => {
  return (
    <Modal
      open={visible}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      destroyOnClose
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
