"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import { setInvoiceIsEdit, setIsInvoice } from "@/lib/slices/invoiceSlice";
import { useState } from "react";

function Invoicehead() {
  const dispatch = useDispatch();
  const { selectedItems, particulars, curCat, curParticular, curBank } =
    useSelector((state) => state.invoice);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsInvoice(true))}>
            + New Entri
          </Button>
          <Button
            onClick={() => dispatch(setInvoiceIsEdit(true))}
            type={selectedItems?._id ? "primary" : "secondary"}
            disabled={selectedItems?._id}
          >
            Edit
          </Button>
        </>
        <>
          <Search />
          <Button type="filter" onClick={handleDateModal}>
            <GiSettingsKnobs />
          </Button>
        </>
      </LayoutHead>
    </>
  );
}

export default Invoicehead;
