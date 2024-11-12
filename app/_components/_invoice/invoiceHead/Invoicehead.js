"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoiceIsEdit,
  setIsInvoiceNewEntry,
} from "@/lib/slices/invoiceSlice";
import FsModal from "../../utils/FsModal";
import InvoiceNewEntryForm from "../../_Forms/_invoiceForms/InvoiceNewEntryForm";
import InvoiceEditForm from "../../_Forms/_invoiceForms/InvoiceEditForm";

function Invoicehead() {
  const dispatch = useDispatch();
  const { isNewEntry, selectedItems, isEdit } = useSelector(
    (state) => state.invoice
  );
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
