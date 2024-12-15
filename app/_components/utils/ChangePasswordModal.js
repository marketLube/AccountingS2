"use client";
import React, { useState } from "react";
import { Modal, Input, Form, Button, message } from "antd";
import { useDispatch } from "react-redux";

const ChangePasswordModal = ({ isOpen, setIsOpen }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleOk = () => {};

  const handleCancel = () => {
    dispatch(setIsOpen(false));
    form.resetFields(); // Reset form fields
  };

  return (
    <Modal
      title="Change Password"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Change Password"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="password"
          label="New Password"
          rules={[
            { required: true, message: "Please enter your new password!" },
            { min: 6, message: "Password must be at least 6 characters long!" },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
