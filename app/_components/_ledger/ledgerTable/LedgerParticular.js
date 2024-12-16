"use client";

import { useSelector } from "react-redux";
import LedgerParticularItems from "./LedgerParticularItems";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axiosInstance";

function LedgerParticular() {
  const { clickedParticular: item } = useSelector((state) => state.ledger);
  const { data } = useQuery({
    queryKey: ["particular-details"],
    queryFn: () =>
      apiClient
        .get(`stats/particular-detail?particular=${item?.particularId}`)
        .then((res) => res.data.result),
  });

  return (
    <div className="ledger-particular">
      <div className="ledger-particular-item-container">
        {data?.map((item, i) => (
          <LedgerParticularItems item={item} key={i} />
        ))}
      </div>
    </div>
  );
}

export default LedgerParticular;
