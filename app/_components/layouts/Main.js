"use client";

import { fetchCategory } from "@/lib/slices/generalSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Main({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return <main className="main">{children}</main>;
}

export default Main;
