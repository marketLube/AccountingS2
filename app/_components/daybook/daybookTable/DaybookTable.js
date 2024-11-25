"use client";
import DaybookTableHead from "./DaybookTableHead";
import TableLoader from "../../_loader/TableLoader";
import DaybookTableItem from "./DaybookTableItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setBanktoBankBtnDisable,
  setBtnDisable,
} from "@/lib/slices/daybookSlice";
import useTransactions from "@/app/_hooks/useTransactions";
import BanktoTableHead from "../../_banktobank/BanktoBankTable/BanktoTableHead";
import BanktoTableitem from "../../_banktobank/BanktoBankTable/BanktoTableitem";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axiosInstance";

function DaybookTable() {
  const { isLoading, isError, error, transactions } = useTransactions();

  const {
    data: banktobank,
    isLoadingbank,
    isErrorbank,
    errorbank,
    refetch,
  } = useQuery({
    queryKey: ["banktobank"],
    queryFn: () => apiClient.get("/to-bank").then((res) => res.data.data),
  });

  const { startPage, type } = useSelector((state) => state.daybook);
  const dispatch = useDispatch();

  const veiwEight = transactions?.slice(startPage, startPage + 8);
  const veiwEightForBank = banktobank?.slice(startPage, startPage + 8);

  useEffect(() => {
    if (veiwEight?.length < 8) {
      dispatch(setBtnDisable(true));
    } else {
      dispatch(setBtnDisable(false));
    }
  }, [dispatch, veiwEight?.length]);

  useEffect(() => {
    if (veiwEightForBank?.length < 8) {
      dispatch(setBanktoBankBtnDisable(true));
    } else {
      dispatch(setBanktoBankBtnDisable(false));
    }
  }, [dispatch, veiwEightForBank?.length]);

  return (
    <div className="table">
      {type == "Bank" ? (
        <>
          <BanktoTableHead />
          {isLoadingbank ? (
            <TableLoader />
          ) : isErrorbank ? (
            <TableLoader error="Something Went Wrong..." />
          ) : veiwEightForBank?.length === 0 ? (
            <div className="no-datafound">No Data Found</div>
          ) : (
            veiwEightForBank?.map((bankto, i) => (
              <BanktoTableitem key={i} banktobank={bankto} />
            ))
          )}
        </>
      ) : (
        <>
          <DaybookTableHead />
          {isLoading ? (
            <TableLoader />
          ) : isError ? (
            <TableLoader error="Something Went Wrong..." />
          ) : veiwEight?.length === 0 ? (
            <div className="no-datafound">No Data Found</div>
          ) : (
            veiwEight?.map((trans, i) => (
              <DaybookTableItem key={i} transaction={trans} />
            ))
          )}
        </>
      )}
    </div>
  );
}

export default DaybookTable;
