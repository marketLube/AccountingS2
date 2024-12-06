"use client";
import { setIsSelected } from "@/lib/slices/ledgerSlice";
import { IoChevronBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function LedgerTableHead() {
  const { isSelected } = useSelector((state) => state.ledger);
  const dispatch = useDispatch();
  return (
    <div className="table-head">
      <span className="table-check">
        {!isSelected ? (
          <input type="checkbox" style={{ opacity: "0" }} />
        ) : (
          <IoChevronBackOutline
            className="arrow-back"
            onClick={() => dispatch(setIsSelected(false))}
          />
        )}
      </span>
      <span className="table-col particular">
        {isSelected ? "Purpose" : "Particular"}
      </span>
      <span className="table-col debit">Debited</span>
      <span className="table-col credit">Credited</span>
      <span className="table-col credit">Gst In</span>
      <span className="table-col credit">Gst Out</span>
      <span className="table-col liability">Liabilty</span>
      <span className="table-col liability">Outstanding</span>
      <span className="table-col branch">Tds Paid</span>
      <span className="table-col branch">Tds Recieved</span>
    </div>
  );
}

export default LedgerTableHead;
