"use client";

import {
  fetchBanks,
  fetchBranches,
  fetchCategory,
} from "@/lib/slices/generalSlice";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangePasswordModal from "../utils/ChangePasswordModal";
import { setIsForgot } from "@/lib/slices/authSlice";

function Main({ children }) {
  const { isLoggedIn, isForgot } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchBranches());
    dispatch(fetchBanks());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <>
      <main className="main">
        {children}
        <ChangePasswordModal isOpen={isForgot} setIsOpen={setIsForgot} />
      </main>
    </>
  );
}

export default Main;
