"use client";

import {
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";
import Tooltip from "../../utils/Tooltip";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInvoiceSelectedItems } from "@/lib/slices/invoiceSlice";

function InvoiceTableItems({ item }) {
  const { selectedItems } = useSelector((state) => state.invoice);
  const particular = useParticularFinder(item?.particular);
  const category = useCategoryFinder(item?.catagory);
  const [isParTooltip, setIsPartooltip] = useState(false);
  const [isRemarkTooltip, setIsRemarkTooltip] = useState(false);

  console.log(item, "kkkkkkkkk");
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
        <span
          className="table-col particular table-body-col"
          onMouseEnter={() => setIsPartooltip(true)}
          onMouseLeave={() => setIsPartooltip(false)}
        >
          invoice No.
        </span>
        <span className="table-col date table-body-col">{item?.Billto}</span>
        <span className="table-col amount table-body-col">
          {item?.Description}
        </span>
        <span className="table-col remark table-body-col">
          {item?.billedby}
        </span>
        <span className="table-col branch table-body-col">
          {item?.Quantity}
        </span>
        <span className="table-col branch table-body-col">
          {item?.Unitprice}
        </span>
        <span className="table-col branch table-body-col">{item?.Total}</span>
      </div>
      <Tooltip
        isVisible={isParTooltip}
        parName={particular?.name}
        catName={category?.name}
        purpose={item?.purpose}
      />
      <Tooltip
        type="remark"
        isVisible={isRemarkTooltip}
        remark={item?.remark}
      />
    </>
  );
}

export default InvoiceTableItems;
