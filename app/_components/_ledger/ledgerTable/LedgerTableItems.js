"use client";

import apiClient from "@/lib/axiosInstance";
import { setClickedParticular, setIsSelected } from "@/lib/slices/ledgerSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function LedgerTableItems({ item }) {
  const dispatch = useDispatch();
  if (!item) return;

  const [gstTotals, setGstTotals] = useState({});

  useEffect(() => {
    async function gstTotals() {
      const res = await apiClient
        .get(`/stats/particular-wise-gst?particular=${item?.particularId}`)
        .then((res) => res.data.result);

      const [result] = res;
      setGstTotals(result);
    }
    gstTotals();
  }, [item]);

  const handleClicked = () => {
    dispatch(setIsSelected(true));
    setClickedParticular(setClickedParticular(item));
  };

  return (
    <div className="table-col" onClick={handleClicked}>
      <span className="table-check">
        <input type="checkbox" style={{ opacity: "0" }} />
      </span>
      <span className="table-col particular table-body-col">
        {item?.particularName}
      </span>
      <span className="table-col debit table-body-col">
        {item?.transactions?.totalDebit?.toFixed(2)}
      </span>
      <span className="table-col credit table-body-col">
        {item?.transactions?.totalCredit?.toFixed(2)}
      </span>
      <span className="table-col credit table-body-col">
        {gstTotals?.totalInGst?.toFixed(2)}
      </span>
      <span className="table-col credit table-body-col">
        {gstTotals?.totalOutGst?.toFixed(2)}
      </span>
      <span className="table-col liability table-body-col">
        {item?.liabilityOutstanding?.totalLiability?.toFixed(2)}
      </span>
      <span className="table-col liability table-body-col">
        {item?.liabilityOutstanding?.totalOutstanding?.toFixed(2)}
      </span>
      <span className="table-col branch table-body-col">
        {item?.transactions?.tdsPayable?.toFixed(2)}
      </span>
      <span className="table-col branch table-body-col">
        {item?.transactions?.tdsReceivable?.toFixed(2)}
      </span>
    </div>
  );
}

export default LedgerTableItems;
