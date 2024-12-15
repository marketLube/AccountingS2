"use client";

import React, { useState } from "react";
import { Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";

const ChangePasswordModal = ({ isOpen, setIsOpen }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    try {
      // Validation for passwords
      if (!password) {
        message.error("Please enter your new password!");
        return;
      }
      if (password.length < 6) {
        message.error("Password must be at least 6 characters long!");
        return;
      }
      if (password !== confirmPassword) {
        message.error("Passwords do not match!");
        return;
      }

      // Example API call for changing password
      const response = await apiClient.post("user/resetPassword", {
        password,
        userId: id,
      });

      if (response.status === 200) {
        message.success("Password changed successfully!");
        handleCancel();
      } else {
        message.error(response.data.message || "Failed to change password.");
      }
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message || "An error occurred.");
      } else {
        console.error("API or network error:", error);
        message.error("Validation failed or network error.");
      }
    }
  };

  const handleCancel = () => {
    dispatch(setIsOpen(false));
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Modal
      title="Change Password"
      open={isOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="password" className="font-medium text-gray-700">
            New Password
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
