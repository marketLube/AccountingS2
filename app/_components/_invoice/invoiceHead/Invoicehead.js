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
  setInvoiceIsEdit,
  setIsInvoiceNewEntry,
} from "@/lib/slices/invoiceSlice";
import FsModal from "../../utils/FsModal";
import InvoiceNewEntryForm from "../../_Forms/_invoiceForms/InvoiceNewEntryForm";
import InvoiceEditForm from "../../_Forms/_invoiceForms/InvoiceEditForm";
import Selector from "../../utils/Selector";

function Invoicehead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    particulars,
    curCat,
    curParticular,
    curBank,
  } = useSelector((state) => state.invoice);

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

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsInvoiceNewEntry(true))}>
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
        </>
        <>
          <Search />
          <Button type="filter">
            <GiSettingsKnobs />
          </Button>
        </>
      </LayoutHead>
      <FsModal isOpen={isNewEntry} setIsCancel={setIsInvoiceNewEntry}>
        <InvoiceNewEntryForm />
      </FsModal>
      <FsModal isOpen={isEdit} setIsCancel={setInvoiceIsEdit}>
        <InvoiceEditForm />
      </FsModal>
    </>
  );
}

export default Invoicehead;
