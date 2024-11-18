"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoiceCurBank,
  setInvoiceCurBranch,
  setInvoiceCurCat,
  setInvoiceCurParticular,
  setInvoiceEndDate,
  setInvoiceIsEdit,
  setInvoiceSelectedDate,
  setInvoiceStartDate,
  setIsInvoice,
  setIsInvoiceNewEntry,
} from "@/lib/slices/invoiceSlice";
import Selector from "../../utils/Selector";
import { useState } from "react";

function Invoicehead() {
  const dispatch = useDispatch();
  const { selectedItems, particulars, curCat, curParticular, curBank } =
    useSelector((state) => state.invoice);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setInvoiceCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setInvoiceCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setInvoiceCurParticular(e.target.value));
  };

  const handlebankChange = (e) => {
    dispatch(setInvoiceCurBank(e.target.value));
  };

  const handleSetStartDate = (date) => {
    dispatch(setInvoiceStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(setInvoiceEndDate(date));
  };

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };

  const handleSelectChange = (range) => {
    console.log(range, "select");
    return () => dispatch(setInvoiceSelectedDate(range));
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
          <Selector
            options={["All Categories", ...categoryNames]}
            callback={handleCatChange}
          />
          <Selector
            options={["All Particulars", ...particulars]}
            callback={handleParticularChange}
            disabled={curCat?.startsWith("All")}
            curValue={curParticular}
          />
          <Selector
            options={["All Branches", ...branchNames]}
            callback={handleBranchChange}
          />
          <Selector
            options={["All Banks", ...bankNames]}
            callback={handlebankChange}
            curValue={curBank}
          />
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
