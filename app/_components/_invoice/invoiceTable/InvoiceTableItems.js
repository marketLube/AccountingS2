"use client";

import { useDispatch, useSelector } from "react-redux";
import { setInvoiceSelectedItems } from "@/lib/slices/invoiceSlice";

function InvoiceTableItems({ item }) {
  const { selectedItems } = useSelector((state) => state.invoice);

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    if (selectedItems?._id === item?._id) {
      dispatch(setInvoiceSelectedItems({}));
    } else {
      dispatch(setInvoiceSelectedItems(item));
    }
  };

  return (
    <>
      <div className="table-col">
        <span className="table-check">
          <input
            type="checkbox"
            checked={selectedItems?._id === item?._id}
            onChange={handleCheckboxChange}
          />
        </span>
        <span className="table-col invoiceId table-body-col">
          {item?.invoiceId}
        </span>

        <span className="table-col billto particular table-body-col">
          {item?.name2}
        </span>
        <span className="table-col remark table-body-col">{item?.name}</span>
        <span className="table-col particular table-body-col">
          {item?.receiverName}
        </span>
        <span className="table-col branch table-body-col">{item?.branch}</span>
        <span className="table-col branch table-body-col">
          {item?.Total || 100}
        </span>
      </div>
    </>
  );
}

export default InvoiceTableItems;
