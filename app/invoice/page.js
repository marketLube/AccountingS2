import CapitalFooter from "../_components/_capital/capitalFooter/CapitalFooter";
import Capitalhead from "../_components/_capital/capitalHead/Capitalhead";
import CapitalTable from "../_components/_capital/capitalTable/CapitalTable";
import InvoiceFooter from "../_components/_invoice/invoiceFooter/InvoiceFooter";
import Invoicehead from "../_components/_invoice/invoiceHead/Invoicehead";
import InvoiceTable from "../_components/_invoice/invoiceTable/InvoiceTable";
import LedgerFooter from "../_components/_ledger/ledgerFooter/LedgerFooter";
import LedgerHead from "../_components/_ledger/ledgerHead/LedgerHead";
import LedgerTable from "../_components/_ledger/ledgerTable/LedgerTable";

function page() {
  return (
    <div className={`layout assetes`}>
      <h1 className={`main-head`}>Invoice</h1>
      <div className={`layout-body`}>
        <Invoicehead />
        <InvoiceTable />
        <InvoiceFooter />
      </div>
    </div>
  );
}

export default page;
