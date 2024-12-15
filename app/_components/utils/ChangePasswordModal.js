"use client";

import React, { useState } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";
import { setIsForgot } from "@/lib/slices/authSlice";
import toast from "react-hot-toast";

const ChangePasswordModal = ({ isOpen, setIsOpen }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);

  const handleCancel = () => {
    dispatch(setIsOpen(false));
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async () => {
    try {
      // Validation for passwords
      if (!password) {
        toast.error("Please enter your new password!");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long!");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      // Example API call for changing password
      const response = await apiClient.post("user/resetPassword", {
        password,
        userId: id,
      });

      if (response.status === 200) {
        toast.success("Password changed successfully!");
        handleCancel();
      } else {
        toast.error(response?.data?.message || "Failed to change password.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred.");
      } else {
        console.error("API or network error:", error);
        toast.error("Validation failed or network error.");
      }
    }
  };

  return (
    <Modal
      title={
        <div className="text-center font-medium text-lg">Change Password</div>
      }
      open={isOpen}
      footer={null}
      onCancel={handleCancel}
      style={{ maxWidth: "400px", width: "90%" }}
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
        <div className="flex justify-center gap-2 mt-4">
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
