"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import { setIsInvoiceNewEntry } from "@/lib/slices/invoiceSlice";
import FsModal from "../../utils/FsModal";
import InvoiceNewEntryForm from "../../_Forms/_invoiceForms/InvoiceNewEntryForm";

function Invoicehead() {
  const dispatch = useDispatch();
  const { isNewEntry } = useSelector((state) => state.invoice);
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsInvoiceNewEntry(true))}>
            + New Entri
          </Button>
          <Button type="secondary">Edit</Button>
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
    </>
  );
}

export default Invoicehead;
