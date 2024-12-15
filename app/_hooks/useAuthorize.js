"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthorize = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) return;
    router.push("/login");
  }, [isLoggedIn]);

  return isLoggedIn;
};
